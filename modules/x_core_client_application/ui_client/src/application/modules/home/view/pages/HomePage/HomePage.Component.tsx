import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/heading";
import {AnimatedMount} from "@Main/view/utils";
import {Grid, WithStyles} from "@material-ui/core";
import {homePageStyle} from "./HomePage.Style";

// Props.
export interface IHomePageOwnProps {}
export interface IHomePageExternalProps extends WithStyles<typeof homePageStyle> {}
export interface IHomePageProps extends IHomePageOwnProps, IHomePageExternalProps {}

@Styled(homePageStyle)
export class HomePage extends PureComponent<IHomePageProps> {

  public render(): ReactNode {

    const {classes} = this.props;

    return (
        <Grid className={classes.root} container>

          <HeaderBar {...{} as IHeaderBarExternalProps}/>

          <AnimatedMount>

            <Grid className={classes.content} justify={"space-around"} alignItems={"center"} container>
              <Grid> Home page </Grid>
              <Grid> todo </Grid>
            </Grid>

          </AnimatedMount>

      </Grid>
    );
  }

}
