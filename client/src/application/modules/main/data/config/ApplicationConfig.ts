import {Single} from "@redux-cbd/utils";

@Single()
export class ApplicationConfig {

  public readonly env: string = (process.env.NODE_ENV as string);
  public readonly isDev: boolean = (process.env.NODE_ENV === "development");

  public readonly defaultVideoScale: number = 16 / 9;
  public readonly defaultRenderingResolution: { width: number, height: number } = { width: 1280, height: 720 };
  public readonly defaultVideoCapturingFramerate: number = 60;

}
