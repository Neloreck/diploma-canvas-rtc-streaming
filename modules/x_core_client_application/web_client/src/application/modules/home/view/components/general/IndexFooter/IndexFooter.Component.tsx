import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Grid, Typography, WithStyles } from "@material-ui/core";
import { indexFooterStyle } from "./IndexFooter.Style";

// Props.
export interface IIndexFooterInjectedProps extends WithStyles<typeof indexFooterStyle> {}
export interface IIndexOwnProps {}
export interface IIndexFooterProps extends IIndexFooterInjectedProps, IIndexOwnProps {}

@Styled(indexFooterStyle)
export class IndexFooter extends PureComponent<IIndexFooterProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid className={classes.root} justify={"center"} alignItems={"center"} container>
        <Typography variant={"h3"}> Footer </Typography>
      </Grid>
    );
  }

}
