import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {graphicsContext, IGraphicsContextState} from "@Module/stream/data/store";

import {Grid, IconButton, Typography, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {previewStatsBlockStyle} from "./PreviewStatsBlock.Style";

export interface IPreviewStatsBlockState {
  showStatsConfiguration: boolean;
}

export interface IPreviewStatsBlockExternalProps extends WithStyles<typeof previewStatsBlockStyle>, IGraphicsContextState {}
export interface IPreviewStatsBlockOwnProps {}
export interface IPreviewStatsBlockProps extends IPreviewStatsBlockOwnProps, IPreviewStatsBlockExternalProps {}

@Consume<IGraphicsContextState, IPreviewStatsBlockProps>(graphicsContext)
@Styled(previewStatsBlockStyle)
export class PreviewStatsBlock extends Component<IPreviewStatsBlockProps, IPreviewStatsBlockState> {

  public state: IPreviewStatsBlockState = {
    showStatsConfiguration: false
  };

  public render(): JSX.Element {

    const {classes} = this.props;
    const {showStatsConfiguration} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} container>

        <Grid container justify={"space-between"} alignItems={"center"}>
          <Typography variant={"h6"}> Stats </Typography>
          <IconButton onClick={this.onStatsBlockViewToggle}>
            { showStatsConfiguration ? <Remove fontSize={"small"}/> : <Add fontSize={"small"}/>}
          </IconButton>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onStatsBlockViewToggle(): void {
    this.setState({ showStatsConfiguration: !this.state.showStatsConfiguration });
  }

}
