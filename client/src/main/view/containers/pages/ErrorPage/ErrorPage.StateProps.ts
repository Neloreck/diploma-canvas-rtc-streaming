import {WithStyles} from "@material-ui/core";
import {errorPageStyle} from "./ErrorPage.Style";

export interface IErrorPageStoreProps {
}

export interface IErrorPageDispatchProps {
}

export interface IErrorPageOwnProps {
}

export interface IErrorPageProps extends IErrorPageDispatchProps, IErrorPageStoreProps,
  IErrorPageOwnProps, WithStyles<typeof errorPageStyle> {
}
