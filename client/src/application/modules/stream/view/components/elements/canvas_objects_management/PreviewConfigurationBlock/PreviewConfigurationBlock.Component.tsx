import * as React from "react";
import {ChangeEvent, Component} from "react";
import {Bind} from "redux-cbd";

import {Styled} from "@Lib/react_lib/@material_ui";

import {FormControlLabel, FormLabel, Grid, Switch} from "@material-ui/core";

import {IPreviewConfigurationBlockProps} from "./PreviewConfigurationBlock.StateProps";
import {previewConfigurationBlockStyle} from "./PreviewConfigurationBlock.Style";

@Styled(previewConfigurationBlockStyle)
export class PreviewConfigurationBlock extends Component<IPreviewConfigurationBlockProps> {

  public render(): JSX.Element {

    const {classes, showGrid, showPreview, showGraphics} = this.props;

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

  @Bind
  private onPreviewToggle(event: ChangeEvent): void {
    this.props.onPreviewToggle((event.target as any).checked);
  }

  @Bind
  private onGraphicsToggle(event: ChangeEvent): void {
    this.props.onGraphicsToggle((event.target as any).checked);
  }

  @Bind
  private onGridToggle(event: ChangeEvent): void {
    this.props.onGridToggle((event.target as any).checked);
  }

}
