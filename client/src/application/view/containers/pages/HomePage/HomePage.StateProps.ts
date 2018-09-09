import {WithStyles} from "@material-ui/core";
import {homePageStyle} from "./HomePage.Style";

export interface IHomePageStoreProps {
  testValue: number;
}

export interface IHomePageDispatchProps {
  sendTest: any;
}

export interface IHomePageOwnProps {
}

export interface IHomePageProps extends IHomePageDispatchProps, IHomePageStoreProps,
  IHomePageOwnProps, WithStyles<typeof homePageStyle> {
}
