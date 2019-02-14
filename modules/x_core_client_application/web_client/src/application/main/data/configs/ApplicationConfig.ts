export const applicationConfig = {
  ENV: (process.env.NODE_ENV as string),
  IS_DEV: (process.env.NODE_ENV === "development"),
  SERVER_LIVE_SOCKET_URL: (process.env.X_CORE__SERVER_URL as string) + "/websocket/live",
  VIDEO: {
    DEFAULT_CAPTURING_FRAMERATE: 30,
    DEFAULT_RENDERING_RESOLUTION: { width: 1280, height: 720 },
    DEFAULT_SCALE: 16 / 9
  },
};
