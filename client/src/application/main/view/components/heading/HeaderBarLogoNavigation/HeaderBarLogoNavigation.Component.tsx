import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {IRouterContext, routerContextManager} from "@Main/data/store";

// View.
import {
  IconButton,
  Typography,
  WithStyles,
} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import {headerBarLogoNavigationStyle} from "./HeaderBarLogoNavigation.Style";

// Props.
export interface IHeaderBarLogoNavigationOwnProps {}
export interface IHeaderBarLogoNavigationExternalProps extends WithStyles<typeof headerBarLogoNavigationStyle>, IRouterContext {}
export interface IHeaderBarLogoNavigationProps extends IHeaderBarLogoNavigationOwnProps, IHeaderBarLogoNavigationExternalProps {}

@Styled(headerBarLogoNavigationStyle)
@Consume<IRouterContext, IHeaderBarLogoNavigationProps>(routerContextManager)
export class HeaderBarLogoNavigation extends PureComponent<IHeaderBarLogoNavigationProps> {

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Fragment>

        <IconButton className={classes.homeButton} onClick={this.redirectToIndexPage}>
          <Home fontSize={"small"}/>
        </IconButton>

        <Typography
          className={classes.logo}
          variant={"h5"} color={"inherit"}
          noWrap
          onClick={this.redirectToIndexPage}
        >
          X-CORE
        </Typography>

      </Fragment>
    );
  }

  @Bind()
  private redirectToIndexPage(): void {

    const {routingActions: {push}} = this.props;

    push("/home");
  }

}
