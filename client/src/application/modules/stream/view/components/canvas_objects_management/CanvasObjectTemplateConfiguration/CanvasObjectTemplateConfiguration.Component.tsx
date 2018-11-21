import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";
import {GeneralUtility} from "@Lib/util/GeneralUtility";

import {
  AbstractMovableCircleObject, AbstractMovableRectangleObject,
  CanvasGraphicsRenderObject,
  CanvasGraphicsSingleObjectPreprocessor
} from "@Lib/react_lib/canvas_video_graphics";

import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";
import {graphicsContext, IGraphicsContextState} from "@Module/stream/data/store";

import {Button, Grid, Typography, WithStyles} from "@material-ui/core";
import {ArrowUpward, ArrowDownward, Close, Delete} from "@material-ui/icons";

import {canvasObjectTemplateConfigurationStyle} from "./CanvasObjectTemplateConfiguration.Style";

export interface ICanvasObjectTemplateConfigurationState {
  localObjectCopy: CanvasGraphicsRenderObject;
  objectDescriptor: ICanvasObjectDescriptor<any>;
}

export interface ICanvasObjectTemplateConfigurationExternalProps extends WithStyles<typeof canvasObjectTemplateConfigurationStyle>, IGraphicsContextState {}

export interface ICanvasObjectTemplateConfigurationOwnProps {
  object: CanvasGraphicsRenderObject;
  onCancelSelection: () => void;
  onSelectedRemove: (object: CanvasGraphicsRenderObject) => void;
}

export interface ICanvasObjectTemplateConfigurationProps extends ICanvasObjectTemplateConfigurationOwnProps, ICanvasObjectTemplateConfigurationExternalProps {}

@Consume<IGraphicsContextState, ICanvasObjectTemplateConfigurationProps>(graphicsContext)
@Styled(canvasObjectTemplateConfigurationStyle)
export class CanvasObjectTemplateConfiguration extends Component<ICanvasObjectTemplateConfigurationProps, ICanvasObjectTemplateConfigurationState> {

  public state: ICanvasObjectTemplateConfigurationState = {
    localObjectCopy: this.getLocalCopyForPreview(this.props.object),
    objectDescriptor: renderingService.getDescriptor(this.props.object) as ICanvasObjectDescriptor<any>
  };

  public componentWillReceiveProps(nextProps: ICanvasObjectTemplateConfigurationProps): void {
    if (nextProps.object !== this.props.object) {
      this.setState({
        localObjectCopy:  this.getLocalCopyForPreview(nextProps.object),
        objectDescriptor: renderingService.getDescriptor(nextProps.object) as ICanvasObjectDescriptor<any>
      });
    }
  }

  public render(): JSX.Element {

    const {object, classes, onCancelSelection, onSelectedRemove} = this.props;
    const {objectDescriptor, localObjectCopy} = this.state;

    return (
      <Grid className={classes.root} container={true} direction={"column"}>

        <Grid className={classes.objectHeading} container justify={"space-between"}>
          <Typography variant={"h6"}>{objectDescriptor.name} </Typography>

          <Grid>
            <Button onClick={() => onSelectedRemove(object)}><Delete/></Button>
            <Button onClick={onCancelSelection}><Close/></Button>
          </Grid>

        </Grid>

        <Grid className={classes.objectEditingMenu} container justify={"space-between"}>

          <Grid className={classes.objectPreviewRenderer} container={true} justify={"center"} alignItems={"center"}>
            <CanvasGraphicsSingleObjectPreprocessor object={localObjectCopy}/>
          </Grid>

          <Grid className={classes.objectPreviewConfiguration}>
            OPTIONS THERE. TODO.
          </Grid>

        </Grid>

        <Grid className={classes.objectEditingControlFooter} justify={"flex-end"} container>
          <Button variant={"contained"} onClick={this.onLocalObjectReset}>Reset</Button>
          <Button variant={"contained"} onClick={this.onLocalChangesApply}>Apply</Button>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private onLocalObjectReset(): void {
    this.setState({
      localObjectCopy: this.getLocalCopyForPreview(this.props.object)
    });
  }

  @Bind()
  private onLocalChangesApply(): void {

    const {object} = this.props;
    const {localObjectCopy} = this.state;

    object.configuration = Object.assign(object.configuration, localObjectCopy.configuration);
  }

  private getLocalCopyForPreview(object: CanvasGraphicsRenderObject): CanvasGraphicsRenderObject {

    const newObject = GeneralUtility.copyInstance(object);

    if (newObject instanceof AbstractMovableRectangleObject) {
      (newObject as AbstractMovableRectangleObject).left = 10;
      (newObject as AbstractMovableRectangleObject).top = 10;
      (newObject as AbstractMovableRectangleObject).width = 80;
      (newObject as AbstractMovableRectangleObject).height = 80;
    } else {
      (newObject as AbstractMovableCircleObject).radius = 45;
      (newObject as AbstractMovableCircleObject).center = { x: 50, y: 50 };
    }

    return newObject;
  }

}
