import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import {
  IconButton,
  Typography,
  WithStyles,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { headerBarLogoNavigationStyle } from "./HeaderBarLogoNavigation.Style";

// Props.
export interface IHeaderBarLogoNavigationOwnProps {}
export interface IHeaderBarLogoNavigationInjectedProps extends WithStyles<typeof headerBarLogoNavigationStyle>, IRouterContext {}
export interface IHeaderBarLogoNavigationProps extends IHeaderBarLogoNavigationOwnProps, IHeaderBarLogoNavigationInjectedProps {}

@Consume(routerContextManager)
@Styled(headerBarLogoNavigationStyle)
export class HeaderBarLogoNavigation extends PureComponent<IHeaderBarLogoNavigationProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <>

        <IconButton
          className={classes.homeButton}
          onClick={this.redirectToIndexPage}
        >
          <Home fontSize={"small"}/>
        </IconButton>

        <Typography
          className={classes.logo}
          variant={"h5"}
          color={"inherit"}
          noWrap
          onClick={this.redirectToIndexPage}
        >
          X-CORE
        </Typography>

      </>
    );
  }

  @Bind()
  private redirectToIndexPage(): void {

    const { routingActions: { push } } = this.props;

    push("/home");
  }

}
