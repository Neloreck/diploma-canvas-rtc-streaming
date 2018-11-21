import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {graphicsContext, IGraphicsContextState} from "@Module/stream//data/store";

import {FormControlLabel, FormLabel, Grid, Switch, WithStyles} from "@material-ui/core";

import {previewConfigurationBlockStyle} from "./PreviewConfigurationBlock.Style";

export interface IPreviewConfigurationBlockExternalProps extends WithStyles<typeof previewConfigurationBlockStyle>, IGraphicsContextState {}
export interface IPreviewConfigurationBlockOwnProps {}
export interface IPreviewConfigurationBlockProps extends IPreviewConfigurationBlockOwnProps, IPreviewConfigurationBlockExternalProps {}

@Consume<IGraphicsContextState, IPreviewConfigurationBlockProps>(graphicsContext)
@Styled(previewConfigurationBlockStyle)
export class PreviewConfigurationBlock extends Component<IPreviewConfigurationBlockProps> {

  public render(): JSX.Element {

    const {classes, graphicsState: {showPreview, showGrid, showGraphics}} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} container>

        <FormLabel component="legend">Preview configuration</FormLabel>

        <FormControlLabel
          label={"Preview mode"}
          control={<Switch checked={showPreview} onChange={this.onPreviewToggle}/>}
        />

        <FormControlLabel
          label={"Show graphics"}
          control={<Switch checked={showGraphics} onChange={this.onGraphicsToggle}/>}
        />

        <FormControlLabel
          label={"Show Grid"}
          control={<Switch checked={showGrid} onChange={this.onGridToggle}/>}
        />

      </Grid>
    );
  }

  @Bind()
  private onPreviewToggle(event: ChangeEvent): void {
    this.props.graphicsActions.setPreviewDisplay((event.target as any).checked);
  }

  @Bind()
  private onGraphicsToggle(event: ChangeEvent): void {
    this.props.graphicsActions.setGraphicsDisplay((event.target as any).checked);
  }

  @Bind()
  private onGridToggle(event: ChangeEvent): void {
    this.props.graphicsActions.setGridDisplay((event.target as any).checked);
  }

}
