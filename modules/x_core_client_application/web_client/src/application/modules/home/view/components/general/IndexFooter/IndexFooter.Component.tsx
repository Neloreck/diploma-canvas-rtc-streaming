import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {Grid, Typography, WithStyles} from "@material-ui/core";
import {indexFooterStyle} from "./IndexFooter.Style";

// Props.
export interface IIndexFooterExternalProps extends WithStyles<typeof indexFooterStyle> {}
export interface IIndexOwnExternalProps {}
export interface IIndexFooterProps extends IIndexFooterExternalProps, IIndexOwnExternalProps {}

@Styled(indexFooterStyle)
export class IndexFooter extends PureComponent<IIndexFooterProps> {

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} justify={"center"} alignItems={"center"} container>
        <Typography variant={"h3"}> Footer </Typography>
      </Grid>
    );
  }

}
