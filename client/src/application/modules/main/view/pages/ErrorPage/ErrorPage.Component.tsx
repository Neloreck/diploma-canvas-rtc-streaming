import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/HeaderBar";
import {WithStyles} from "@material-ui/core";
import {errorPageStyle} from "./ErrorPage.Style";

// Props.
export interface IErrorPageOwnProps {}

export interface IErrorPageExternalProps extends WithStyles<typeof errorPageStyle> {}

export interface IErrorPageProps extends IErrorPageOwnProps, IErrorPageExternalProps {}

@Styled(errorPageStyle)
export class ErrorPage extends PureComponent<IErrorPageProps> {

  public render(): ReactNode {
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
