export class AppConfig {

  public readonly env = process.env.NODE_ENV;
  public readonly isDev = process.env.NODE_ENV === "development";

}
