import {WithStyles} from "@material-ui/core";
import {homePageStyle} from "./HomePage.Style";

export interface IHomePageStoreProps {
  authorizing: boolean;
}

export interface IHomePageDispatchProps {
}

export interface IHomePageOwnProps {
}

export interface IHomePageProps extends IHomePageDispatchProps, IHomePageStoreProps,
  IHomePageOwnProps, WithStyles<typeof homePageStyle> {
}
