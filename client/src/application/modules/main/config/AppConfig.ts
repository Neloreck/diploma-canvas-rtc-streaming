import {Single} from "redux-cbd";

@Single
export class AppConfig {

  public readonly env: string = (process.env.NODE_ENV as string);
  public readonly isDev: boolean = (process.env.NODE_ENV === "development");

}
