const prod = process.env.NODE_ENV === "production";

export default {
    baseUrl: prod ? (process.env.PROD_URL as string) : "http://localhost:3000",
    CONTENTFUL_IMAGE_LIMIT: 20*1000*1000, // 20 MB
    dbUrl: process.env.MONGO_DB ?? "mongodb://localhost:27017",
    pages: {
        index: "/",
        journal: {
            index: "/journal",
            create: "/journal/create",
        },
        portal: {
            login: "/portal",
            dashboard: "/portal/dashboard",
            passwordReset: "portal/password-reset",
            newPassword: "portal/new-password",
        },
    },
    api: {
        admin: {
            login: "/api/admin/login",
            signup: "/api/admin/signup",
            forgotPass: "/api/admin/forgotPass",
            resetPass: "/api/admin/resetPass",
            validateLogin: "/api/admin/validateLogin",
            signout: "/api/admin/signout",
        },
        blog: {
            get: "/api/blog/getBlog",
        },
        chapter: {
            add: "/api/chapter/addChapter",
            get: "/api/chapter/getChapter",
            update: "/api/chapter/updateChapter",
        },
        officer: {
            get: "/api/officer/getOfficers",
        },
        resource: {
            add: "/api/resource/addResource",
            get: "/api/resource/getResource",
            update: "/api/resource/updateResource",
            delete: "/api/resource/deleteResource",
        },
    },
};
