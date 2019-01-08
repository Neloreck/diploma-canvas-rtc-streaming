import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/heading";
import {Grid, Grow, WithStyles} from "@material-ui/core";
import {homePageStyle} from "./HomePage.Style";

// Props.
export interface IHomePageState {
  mounted: boolean;
}

export interface IHomePageOwnProps {}
export interface IHomePageExternalProps extends WithStyles<typeof homePageStyle> {}
export interface IHomePageProps extends IHomePageOwnProps, IHomePageExternalProps {}

@Styled(homePageStyle)
export class HomePage extends Component<IHomePageProps, IHomePageState> {

  public state: IHomePageState = {
    mounted: true
  };

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {
    this.setState({ mounted: false });
  }

  public render(): ReactNode {

    const {classes} = this.props;
    const {mounted} = this.state;

    return (
        <Grid className={classes.root} container>

          <HeaderBar {...{} as IHeaderBarExternalProps}/>

          <Grow in={mounted}>

            <Grid className={classes.content} justify={"space-around"} alignItems={"center"} container>
              <Grid> Home page </Grid>
              <Grid> todo </Grid>
            </Grid>

          </Grow>

      </Grid>
    );
  }

}
