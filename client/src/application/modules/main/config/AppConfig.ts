import {Single} from "@redux-cbd/utils";

@Single()
export class AppConfig {

  public readonly env: string = (process.env.NODE_ENV as string);
  public readonly isDev: boolean = (process.env.NODE_ENV === "development");

}
