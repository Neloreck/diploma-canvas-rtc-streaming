import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/HeaderBar";
import {ISignUpFormExternalProps, SignUpForm} from "@Main/view/components/SignUpForm";
import {Grid, WithStyles} from "@material-ui/core";
import {signUpPageStyle} from "./SignUpPage.Style";

// Props.
export interface ISignUpPageOwnProps {}

export interface ISignUpPageExternalProps extends WithStyles<typeof signUpPageStyle> {}

export interface ISignUpPageProps extends ISignUpPageOwnProps, ISignUpPageExternalProps {}

@Styled(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public render(): ReactNode {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid container justify={"center"} alignItems={"center"} className={this.props.classes.content}>
          <SignUpForm {...{} as ISignUpFormExternalProps}/>
        </Grid>

      </Grid>
    );
  }

}
