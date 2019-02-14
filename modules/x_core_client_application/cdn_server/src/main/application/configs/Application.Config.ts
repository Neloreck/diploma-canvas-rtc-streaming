export const applicationConfig = {
  API_SERVER_URL:  process.env.NODE_ENV === "production" ?  "http://api.xcore.local:81" : "http://localhost:8080",
  MODE: process.env.NODE_ENV,
  PORT: 4000
};
