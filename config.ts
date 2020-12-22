
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
  },
  revalidate: {
    journal: 1,
    chapter: 15,
  }
};
