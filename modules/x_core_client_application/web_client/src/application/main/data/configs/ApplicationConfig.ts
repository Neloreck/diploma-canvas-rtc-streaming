export const applicationConfig = {
  defaultRenderingResolution: { width: 1280, height: 720 },
  defaultVideoCapturingFramerate: 30,
  defaultVideoScale: 16 / 9,
  env: (process.env.NODE_ENV as string),
  isDev: (process.env.NODE_ENV === "development"),
  serverLiveSocketUrl: "http://localhost:8080/websocket/live"
};
