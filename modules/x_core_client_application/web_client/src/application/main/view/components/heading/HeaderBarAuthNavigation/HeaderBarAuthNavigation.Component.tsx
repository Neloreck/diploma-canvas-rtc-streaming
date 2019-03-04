import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { authContextManager, IAuthContext, IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import {
  Button,
  WithStyles, Zoom,
} from "@material-ui/core";
import { headerBarAuthNavigationStyle } from "./HeaderBarAuthNavigation.Style";

// Props.
export interface IHeaderBarAuthNavigationOwnProps {}
export interface IHeaderBarAuthNavigationInjectedProps extends WithStyles<typeof headerBarAuthNavigationStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarAuthNavigationProps extends IHeaderBarAuthNavigationOwnProps, IHeaderBarAuthNavigationInjectedProps {}

@Styled(headerBarAuthNavigationStyle)
@Consume(authContextManager, routerContextManager)
export class HeaderBarAuthNavigation extends PureComponent<IHeaderBarAuthNavigationProps> {

  public render(): ReactNode {

    const { routingActions: { getCurrentLocation }, authState: { authorizing } } = this.props;

    const currentLocation: string = getCurrentLocation();
    const isLoginPage: boolean = (currentLocation === "/authentication/login");
    const isSignUpPage: boolean = (currentLocation === "/authentication/register");

    return (
      <>

        <Zoom in={!isLoginPage}>
          <Button
            disabled={authorizing}
            variant={"contained"}
            color={"default"}
            onClick={this.redirectToLoginPage}
          >
            Login
          </Button>
        </Zoom>

        {
          !isSignUpPage &&
          <Zoom in={!isSignUpPage}>
            <Button
              disabled={authorizing}
              variant={"contained"}
              color={"default"}
              onClick={this.redirectToSignUpPage}
            >
              SignUp
            </Button>
          </Zoom>
        }

      </>
    );
  }

  @Bind()
  private redirectToLoginPage(): void {

    const { routingActions: { push } } = this.props;

    push("/authentication/login");
  }

  @Bind()
  private redirectToSignUpPage(): void {

    const { routingActions: { push } } = this.props;

    push("/authentication/register");
  }

}
