import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { ChangeEvent, Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import {
  IRenderingContext,
  ISourceContext, renderingContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import { Divider, FormControlLabel, Grid, Grow, Switch, Typography, WithStyles } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { previewConfigurationBlockStyle } from "./PreviewConfigurationBlock.Style";

// Props.
export interface IPreviewConfigurationBlockState {
  showPreviewConfiguration: boolean;
}

export interface IPreviewConfigurationBlockInjectedProps extends WithStyles<typeof previewConfigurationBlockStyle>, IRenderingContext, ISourceContext {}
export interface IPreviewConfigurationBlockOwnProps {}
export interface IPreviewConfigurationBlockProps extends IPreviewConfigurationBlockOwnProps, IPreviewConfigurationBlockInjectedProps {}

@Consume(sourceContextManager, renderingContextManager)
@Styled(previewConfigurationBlockStyle)
export class PreviewConfigurationBlock extends Component<IPreviewConfigurationBlockProps, IPreviewConfigurationBlockState> {

  public state: IPreviewConfigurationBlockState = {
    showPreviewConfiguration: true
  };

  public render(): ReactNode {

    const { classes, renderingState: { addDisabledObjects, showPreview, showGrid, showGraphics, propagateRendererEvents } } = this.props;
    const { showPreviewConfiguration } = this.state;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <Grid
          className={classes.heading}
          container justify={"space-between"}
          alignItems={"center"}
          onClick={this.onPreviewBlockViewToggle}
        >
          <Typography variant={"h6"}> Configuration </Typography>
          { showPreviewConfiguration ? <Remove fontSize={"small"}/> : <Add fontSize={"small"}/>}
        </Grid>

        <Grow in={showPreviewConfiguration}>

          { showPreviewConfiguration
            ?
              <Grid container direction={"column"} wrap={"nowrap"}>

                <Grid container>
                  <FormControlLabel
                    className={classes.configItem}
                    label={"Preview Mode"}
                    control={<Switch checked={showPreview} color={"primary"} onChange={this.onPreviewToggle}/>}
                  />
                </Grid>

                <Divider/>

                <Grid container>
                  <FormControlLabel
                    className={classes.configItem}
                    label={"Show Graphics"}
                    control={<Switch checked={showGraphics} color={"primary"} onChange={this.onGraphicsToggle}/>}
                  />
                  <FormControlLabel
                    className={classes.configItem}
                    label={"Show Preview Grid"}
                    control={<Switch checked={showGrid} color={"primary"}  onChange={this.onGridToggle}/>}
                  />
                </Grid>

                <Divider/>

                <Grid container>
                  <FormControlLabel
                    className={classes.configItem}
                    label={"Create Disabled Objects"}
                    control={<Switch checked={addDisabledObjects} color={"primary"}  onChange={this.onAdditionObjectsVisibilityToggle}/>}
                  />
                  <FormControlLabel
                    className={classes.configItem}
                    label={"Propagate Canvas Events"}
                    control={<Switch checked={propagateRendererEvents} color={"primary"}  onChange={this.onRenderEventsPropagationToggle}/>}
                  />
                </Grid>

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
  private onRenderEventsPropagationToggle(event: ChangeEvent<HTMLInputElement>): void {
    this.props.renderingActions.setRendererEventsPropagation(event.target.checked);
  }

  @Bind()
  private onAdditionObjectsVisibilityToggle(event: ChangeEvent<HTMLInputElement>): void {
    this.props.renderingActions.setAdditionVisibility(event.target.checked);
  }

  @Bind()
  private onPreviewToggle(event: ChangeEvent<HTMLInputElement>): void {
    this.props.renderingActions.setPreviewDisplay(event.target.checked);
  }

  @Bind()
  private onGraphicsToggle(event: ChangeEvent<HTMLInputElement>): void {
    this.props.renderingActions.setGraphicsDisplay(event.target.checked);
  }

  @Bind()
  private onGridToggle(event: ChangeEvent<HTMLInputElement>): void {
    this.props.renderingActions.setGridDisplay(event.target.checked);
  }

}
