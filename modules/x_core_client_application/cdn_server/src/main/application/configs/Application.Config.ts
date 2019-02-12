export const applicationConfig = {
  apiServerUrl:  process.env.NODE_ENV === "production" ?  "http://api.xcore.local:81" : "http://localhost:8080",
  mode: process.env.NODE_ENV,
  port: 4000
};
