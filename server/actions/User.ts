import mongoDB from "../index";
import { ObjectID } from "mongodb";
import { User } from "utils/types";
import UserModel, { UserDocument } from "server/models/User";
import { hash, compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { randomBytes } from "crypto";
import urls from "utils/urls";
import { createTransport } from "nodemailer";

/**
 * Logs the user in
 * @param user The User that is attempting to login
 * @returns signed JWT
 * @throws Invalid Username or Password: if no credentials match
 */
export async function login(user: User): Promise<string> {
    if (user.email == null || user.password == null)
        throw new Error("Parameters cannot be empty");

    await mongoDB();

    const apparentUser = await UserModel.findOne({ email: user.email });
    if (!apparentUser || !apparentUser.password)
        throw new Error("Invalid Username or Password");

    const same = await compare(user.password, apparentUser.password);
    if (!same) throw new Error("Invalid Username or Password");

    const secret: Secret = process.env.JWTSECRET as string;

    return sign(
        {
            _id: apparentUser._id as ObjectID,
            email: apparentUser.email,
            role: apparentUser.role,
        },
        secret,
        {
            expiresIn: "7d",
        }
    );
}

/**
 * Adds a new user to the database
 * @param user The user to be created and added to the database
 */
export async function createUser(user: User): Promise<void> {
    if (user.email == null || user.password == null) 
        throw new Error("Parameters cannot be empty");

    const isNew = await checkEmail(user.email);
    if (isNew?._id) 
        throw new Error("Email already used");

    await mongoDB();

    const { email, password } = user;
    const hashedPassword = await hash(password, 10);

    const newUser = new UserModel({
        email,
        password: hashedPassword,
        role: user.role ?? "",
    });

    await newUser.save();
}

/**
 * Checks if the given email is already in use
 * @param email check against database for exisiting value
 * @returns The UserDocument of the user with the given email, or null if it does not exisit
 */
export async function checkEmail(email: string): Promise<UserDocument | null> {
    await mongoDB();
    return UserModel.findOne({ email: email });
}

/**
 * Changes the password on the user with the reset Key
 * @param resetKey The key sent in the email to the user to reset a password
 * @param newPassword The new password that the user wants to use
 */
export async function resetPassword(email: string, resetKey: string, newPassword: string): Promise<void> {
    if (!resetKey || !newPassword) throw new Error("Invalid User");

    await mongoDB();

    const userToReset = await UserModel.findOne({ email: email });
    if (!userToReset || !userToReset.resetKey) 
        throw new Error("Invalid User");

    const same = await compare(resetKey, userToReset.resetKey);
    if (!same) 
        throw new Error("Invalid User");

    const hashedPassword = await hash(newPassword, 10);
    userToReset.password = hashedPassword;
    userToReset.resetKey = "";
    await userToReset.save();
}

/**
 * Sends the reset password URL with resetKey to user's email address
 * @param email User's email to send reset Key
 */
export async function sendForgotPasswordEmail(email: string): Promise<void> {
    if (!email) throw new Error("No email provided");

    await mongoDB();

    const existingUser = await checkEmail(email);
    if (!existingUser) 
        throw new Error("No user with that email found");

    const randomHash = randomBytes(16).toString("hex");
    const doubleHash = await hash(randomHash, 10);
    existingUser.resetKey = doubleHash;
    await existingUser.save();

    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: "mvpassreset@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    const baseURL = urls.baseUrl ?? "http://localhost:3000";
    const mailOptions = {
        from: "mvpassreset@gmail.com",
        to: email,
        subject: "MindVersity Admin Password Reset",
        text: `Click this link to reset your MindVeristy Admin password:\n${baseURL}/${urls.pages.newPassword}?email=${email}&key=${randomHash}`,
    };

    transporter.sendMail(mailOptions);
}
