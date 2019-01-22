import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {Grid, WithStyles} from "@material-ui/core";
import {OutputStatsBlock} from "@Module/stream/view/components/tabs/stats/OutputStatsBlock";
import {IOutputStatsBlockProps} from "@Module/stream/view/components/tabs/stats/OutputStatsBlock/OutputStatsBlock.Component";
import {statsTabStyle} from "./StatsTab.Style";

// Props.

export interface IStatsTabExternalProps extends WithStyles<typeof statsTabStyle> {}
export interface IStatsTabOwnProps {}
export interface IStatsTabProps extends IStatsTabOwnProps, IStatsTabExternalProps {}

@Styled(statsTabStyle)
export class StatsTab extends PureComponent<IStatsTabProps> {

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <OutputStatsBlock {...{} as IOutputStatsBlockProps}/>

      </Grid>
    );
  }

}
