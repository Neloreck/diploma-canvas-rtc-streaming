import * as React from "react";
import {Component} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/HeaderBar";
import {WithStyles} from "@material-ui/core";
import {errorPageStyle} from "./ErrorPage.Style";

// Props.
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
