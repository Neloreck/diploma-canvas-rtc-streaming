import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

// Lib.
import {AbstractMovableCircleObject, AbstractMovableRectangleObject, CanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/@material_ui";
import {GeneralUtils} from "@Lib/util/GeneralUtils";

// Data.
import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";

// View.
import {Button, Grid, IconButton, Typography, WithStyles} from "@material-ui/core";
import {ArrowDownward, ArrowUpward, Close, Delete} from "@material-ui/icons";
import {CanvasGraphicsSingleObjectPreprocessor} from "@Module/stream/view/components/preview/graphics_preprocessing";
import {
  IObjectDescriptorConfigurationBlockExternalProps, ObjectDescriptorConfigurationBlock
} from "@Module/stream/view/components/tabs/objects_configuration/ObjectDescriptorConfigurationBlock";
import {objectTemplateConfigurationBlockStyle} from "./ObjectTemplateConfigurationBlock.Style";

// Props.
export interface IObjectTemplateConfigurationBlockState {
  localObjectCopy: CanvasGraphicsRenderObject;
  objectDescriptor: ICanvasObjectDescriptor<any>;
}

export interface IObjectTemplateConfigurationBlockExternalProps extends WithStyles<typeof objectTemplateConfigurationBlockStyle> {}

export interface IObjectTemplateConfigurationBlockOwnProps {
  index: number;
  maxIndex: number;
  object: CanvasGraphicsRenderObject;
  onCancelSelection: () => void;
  onObjectIndexSwap: (oldIndex: number, newIndex: number) => void;
  onChangesApply: (object: CanvasGraphicsRenderObject) => void;
  onSelectedRemove: (object: CanvasGraphicsRenderObject) => void;
}

export interface IObjectTemplateConfigurationBlockProps extends IObjectTemplateConfigurationBlockOwnProps, IObjectTemplateConfigurationBlockExternalProps {}

@Styled(objectTemplateConfigurationBlockStyle)
export class ObjectTemplateConfigurationBlock extends Component<IObjectTemplateConfigurationBlockProps, IObjectTemplateConfigurationBlockState> {

  public state: IObjectTemplateConfigurationBlockState = {
    localObjectCopy: this.getLocalCopyForPreview(this.props.object),
    objectDescriptor: renderingService.getDescriptor(this.props.object) as ICanvasObjectDescriptor<any>
  };

  public componentWillReceiveProps(nextProps: IObjectTemplateConfigurationBlockProps): void {
    if (nextProps.object !== this.props.object) {
      this.setState({
        localObjectCopy:  this.getLocalCopyForPreview(nextProps.object),
        objectDescriptor: renderingService.getDescriptor(nextProps.object) as ICanvasObjectDescriptor<any>
      });
    }
  }

  public render(): JSX.Element {

    const {index, maxIndex, object, classes, onCancelSelection, onSelectedRemove, onObjectIndexSwap} = this.props;
    const {objectDescriptor, localObjectCopy} = this.state;

    return (
      <Grid className={classes.root} container={true} direction={"column"}>

        <Grid className={classes.objectHeading} container justify={"space-between"}>

          <Grid className={classes.objectHeadingTitle}>
            <Typography variant={"h6"}>{objectDescriptor.name} </Typography>
            <IconButton disabled={index === maxIndex} onClick={() => onObjectIndexSwap(index, index + 1)}> <ArrowUpward fontSize={"small"}/> </IconButton>
            <IconButton disabled={index === 0} onClick={() => onObjectIndexSwap(index, index - 1)}> <ArrowDownward fontSize={"small"}/> </IconButton>
          </Grid>

          <Grid>
            <Button onClick={() => onSelectedRemove(object)}><Delete/></Button>
            <Button onClick={onCancelSelection}><Close/></Button>
          </Grid>

        </Grid>

        <Grid className={classes.objectEditingMenu} container justify={"space-between"}>

          <Grid className={classes.objectEditingMenuContent} container wrap={"nowrap"}>

            <Grid className={classes.objectPreviewConfiguration}>

              <ObjectDescriptorConfigurationBlock
                object={localObjectCopy}
                descriptor={objectDescriptor}
                {...{} as IObjectDescriptorConfigurationBlockExternalProps}
              />

            </Grid>

            <Grid className={classes.objectPreviewRenderer} container={true} justify={"flex-end"} alignItems={"center"}>
              <CanvasGraphicsSingleObjectPreprocessor object={localObjectCopy}/>
            </Grid>

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

    const {onChangesApply} = this.props;
    const {localObjectCopy} = this.state;

    onChangesApply(localObjectCopy);
  }

  private getLocalCopyForPreview(object: CanvasGraphicsRenderObject): CanvasGraphicsRenderObject {

    const newObject = GeneralUtils.copyInstance(object);

    newObject.setDisabled(false);

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
