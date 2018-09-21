import {WithStyles} from "@material-ui/core";

import {headerBarStyle} from "./HeaderBar.Style";

export interface IHeaderBarOwnProps {
}

export interface IHeaderBarExternalProps extends WithStyles<typeof headerBarStyle>  {
}

export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarExternalProps {}
