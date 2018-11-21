import * as React from "react";
import {PureComponent} from "react";

import {AppBar, Button, Grid, Toolbar, Typography, WithStyles} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";

import {headerBarStyle} from "./HeaderBar.Style";

export interface IHeaderBarOwnProps {}

export interface IHeaderBarExternalProps extends WithStyles<typeof headerBarStyle>  {}

export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarExternalProps {}

@Styled(headerBarStyle)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): JSX.Element {
    const {classes} = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>
        <Toolbar>

          <Typography className={classes.logo} variant={"h5"} color={"inherit"} noWrap>
            X-CORE
          </Typography>

          <Grid container className={classes.rightBar}>
            <Button variant={"contained"} color={"default"}>Login</Button>
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

}
