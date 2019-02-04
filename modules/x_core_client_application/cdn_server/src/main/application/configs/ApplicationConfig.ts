export const applicationConfig = {
  apiServerUrl:  process.env.NODE_ENV === "production" ?  "api.xcore.local:81" : "localhost:8080",
  mode: process.env.NODE_ENV
};
