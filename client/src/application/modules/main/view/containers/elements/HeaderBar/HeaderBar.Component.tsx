import * as React from "react";
import {PureComponent} from "react";

import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";

import {IHeaderBarProps} from "./HeaderBar.StateProps";
import {headerBarStyle} from "./HeaderBar.Style";

@Styled(headerBarStyle)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): JSX.Element {
    const {classes} = this.props;

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>

          <Typography className={classes.logo} variant="title" color="inherit" noWrap>
            X-CORE
          </Typography>

          <Grid container className={classes.rightBar}>
            <Button variant="raised" color="default">Placeholder</Button>
            <Button variant="raised" color="default">Placeholder</Button>
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

}
