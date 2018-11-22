import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {graphicsContext, IGraphicsContextState} from "@Module/stream//data/store";

import {Divider, FormControlLabel, Grid, Grow, IconButton, Switch, Typography, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {previewConfigurationBlockStyle} from "./PreviewConfigurationBlock.Style";

export interface IPreviewConfigurationBlockState {
  showPreviewConfiguration: boolean;
}

export interface IPreviewConfigurationBlockExternalProps extends WithStyles<typeof previewConfigurationBlockStyle>, IGraphicsContextState {}
export interface IPreviewConfigurationBlockOwnProps {}
export interface IPreviewConfigurationBlockProps extends IPreviewConfigurationBlockOwnProps, IPreviewConfigurationBlockExternalProps {}

@Consume<IGraphicsContextState, IPreviewConfigurationBlockProps>(graphicsContext)
@Styled(previewConfigurationBlockStyle)
export class PreviewConfigurationBlock extends Component<IPreviewConfigurationBlockProps, IPreviewConfigurationBlockState> {

  public state: IPreviewConfigurationBlockState = {
    showPreviewConfiguration: true
  };

  public render(): JSX.Element {

    const {classes, graphicsState: {addVisibleObjects, showPreview, showGrid, showGraphics, showMainVideo}} = this.props;
    const {showPreviewConfiguration} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} container>

        <Grid className={classes.heading} container justify={"space-between"} alignItems={"center"} onClick={this.onPreviewBlockViewToggle}>
          <Typography variant={"h6"}> View Configuration </Typography>
          { showPreviewConfiguration ? <Remove fontSize={"small"}/> : <Add fontSize={"small"}/>}
        </Grid>

        <Grow in={showPreviewConfiguration}>

          { showPreviewConfiguration
            ?
              <Grid container direction={"column"}>

                <FormControlLabel
                  label={"Preview mode"}
                  control={<Switch checked={showPreview} color={"primary"} onChange={this.onPreviewToggle}/>}
                />

                <Divider/>

                <FormControlLabel
                  label={"Show Main Video"}
                  control={<Switch checked={showMainVideo} color={"primary"} onChange={this.onMainVideoDisplayToggle}/>}
                />

                <FormControlLabel
                  label={"Show graphics"}
                  control={<Switch checked={showGraphics} color={"primary"} onChange={this.onGraphicsToggle}/>}
                />

                <FormControlLabel
                  label={"Show Grid"}
                  control={<Switch checked={showGrid} color={"primary"}  onChange={this.onGridToggle}/>}
                />

                <Divider/>

                <FormControlLabel
                  label={"Create Visible Objects"}
                  control={<Switch checked={addVisibleObjects} color={"primary"}  onChange={this.onAdditionObjectsVisibilityToggle}/>}
                />

              </Grid>
            : <span/>
          }

        </Grow>

      </Grid>
    );
  }

  @Bind()
  private onPreviewBlockViewToggle(): void {
    this.setState({ showPreviewConfiguration: !this.state.showPreviewConfiguration });
  }

  @Bind()
  private onAdditionObjectsVisibilityToggle(event: ChangeEvent): void {
    this.props.graphicsActions.setAdditionVisibility((event.target as any).checked);
  }

  @Bind()
  private onMainVideoDisplayToggle(event: ChangeEvent): void {
    this.props.graphicsActions.setMainVideoDisplay((event.target as any).checked);
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
