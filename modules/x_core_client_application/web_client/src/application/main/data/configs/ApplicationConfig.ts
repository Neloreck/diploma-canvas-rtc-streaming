export const applicationConfig = {
  ENV: (process.env.NODE_ENV as string),
  IS_DEV: (process.env.NODE_ENV === "development")
};
