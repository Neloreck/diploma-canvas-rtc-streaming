import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/heading";
import {AnimatedMount} from "@Main/view/utils";
import {Card, CardContent, Grid, Typography, WithStyles} from "@material-ui/core";
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
        <Grid className={classes.root} wrap={"nowrap"} container>

          <HeaderBar {...{} as IHeaderBarExternalProps}/>

          <AnimatedMount>

            <Grid
              className={classes.content}
              justify={"space-around"} direction={"column"} alignItems={"stretch"} container
            >

              <Grid container>

                <Grid sm={8} item>
                  <Card>
                    <CardContent>
                      <Typography color={"textSecondary"} gutterBottom>
                        Welcome to X-Core streaming platform.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid sm={4} item>
                  <Card>
                    <CardContent>
                      <Typography color={"textSecondary"} gutterBottom>
                        Welcome to X-Core streaming platform.
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <Typography color={"textSecondary"} gutterBottom>
                        Welcome to X-Core streaming platform.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>

              <Grid container>
                Footer
              </Grid>

            </Grid>

          </AnimatedMount>

      </Grid>
    );
  }

}
