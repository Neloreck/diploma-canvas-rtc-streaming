import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {WithStyles} from "@material-ui/core";

import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/HeaderBar";

import {errorPageStyle} from "./ErrorPage.Style";

export interface IErrorPageOwnProps {}

export interface IErrorPageExternalProps extends WithStyles<typeof errorPageStyle> {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageExternalProps {}

@Styled(errorPageStyle)
export class ErrorPage extends Component<IErrorPageProps> {

  public render(): JSX.Element {
    const {classes} = this.props;

    return (
      <div className={classes.root}>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <div className={classes.content}>
          This is error page...
        </div>

      </div>
    );
  }

}
