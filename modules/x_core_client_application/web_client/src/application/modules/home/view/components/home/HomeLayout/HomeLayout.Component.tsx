import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Card, CardContent, Grid, Typography, WithStyles } from "@material-ui/core";
import { homeLayoutStyle } from "./HomeLayout.Style";

// Props.
export interface IHomeLayoutInjectedProps extends WithStyles<typeof homeLayoutStyle> {}
export interface IHomeLayoutOwnProps {}
export interface IHomeLayoutProps extends IHomeLayoutInjectedProps, IHomeLayoutOwnProps {}

@Styled(homeLayoutStyle)
export class HomeLayout extends PureComponent<IHomeLayoutProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid className={classes.root} container>

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

      </Grid>
    );
  }

}
