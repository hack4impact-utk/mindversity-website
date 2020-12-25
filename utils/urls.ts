const prod = process.env.NODE_ENV === "production";

export default {
    baseUrl: prod ? "http://localhost:3000" : "http://localhost:3000",
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
            passwordReset: "/portal/password-reset",
            newPassword: "/portal/new-password",
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
        chapter: {
            add: "/api/chapter/addChapter",
            get: "/api/chapter/getChapters",
            update: "/api/chapter/updateChapter",
        },
        officer: {
            add: "/api/officer/addOfficer",
            get: "/api/officer/getOfficers",
            delete: "/api/officer/deleteOfficer",
        },
        resource: {
            add: "/api/resource/addResource",
            get: "/api/resource/getResource",
            update: "/api/resource/updateResource",
            delete: "/api/resource/deleteResource",
        },
        journal: {
            getByType: "/api/journal/getByType",
            getById: "/api/journal/getById",
            getByReviewStatus: "/api/journal/getByReviewStatus",
        }, 
    },
};
