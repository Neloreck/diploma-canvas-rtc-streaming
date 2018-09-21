import * as React from "react";
import {PureComponent} from "react";

import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";

import {withStyle} from "@Lib/annotate";

import {IHeaderBarProps} from "./HeaderBar.StateProps";
import {headerBarStyle} from "./HeaderBar.Style";

@withStyle(headerBarStyle)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): JSX.Element {
    const classes = this.props.classes;

    return (
      <AppBar className={this.props.classes.root} position="static">
        <Toolbar>

          <Typography variant="title" color="inherit" noWrap>
            X-Core
          </Typography>

          <div className={classes.grow} />

          <Grid container>
            <Button variant="raised" color="default">1</Button>
            <Button variant="raised" color="default">2</Button>
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

}
