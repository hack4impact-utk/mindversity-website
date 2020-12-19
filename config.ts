
export default {
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
    options: {  
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  baseUrl: process.env.BASE_URL,
  pages: {
    index: "/",
    login: "/login",
    blog: (path = "[id]"): string => `/blog/${path}`,
  },
  apis: {
    login: new URL("/api/login", process.env.BASE_URL),
    getChapterByName: new URL("/api/getChapterByName", process.env.BASE_URL)  
  }
};
