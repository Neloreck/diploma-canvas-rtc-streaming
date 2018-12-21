import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {AbstractBaseCircleObject, AbstractBaseRectangleObject, AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/mui";
import {GeneralUtils} from "@Lib/utils";

// Data.
import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";

// View.
import {Button, Checkbox, Grid, IconButton, Typography, WithStyles} from "@material-ui/core";
import {ArrowDownward, ArrowUpward, Close, Delete} from "@material-ui/icons";
import {CanvasGraphicsSingleObjectRenderer} from "@Module/stream/view/components/preview/graphics_preprocessing/single/CanvasGraphicsSingleObjectRenderer";
import {
  IObjectDescriptorConfigurationBlockExternalProps, ObjectDescriptorConfigurationBlock
} from "@Module/stream/view/components/tabs/objects_configuration/ObjectDescriptorConfigurationBlock";
import {objectTemplateConfigurationBlockStyle} from "./ObjectTemplateConfigurationBlock.Style";

// Props.
export interface IObjectTemplateConfigurationBlockState {
  localObjectCopy: AbstractCanvasGraphicsRenderObject<any>;
  objectDescriptor: ICanvasObjectDescriptor<any>;
}

export interface IObjectTemplateConfigurationBlockExternalProps extends WithStyles<typeof objectTemplateConfigurationBlockStyle> {}

export interface IObjectTemplateConfigurationBlockOwnProps {
  index: number;
  maxIndex: number;
  object: AbstractCanvasGraphicsRenderObject<any>;
  onCancelSelection: () => void;
  onObjectIndexSwap: (oldIndex: number, newIndex: number) => void;
  onChangesApply: (object: AbstractCanvasGraphicsRenderObject<any>) => void;
  onSelectedRemove: (object: AbstractCanvasGraphicsRenderObject<any>) => void;
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

  public render(): ReactNode {

    const {index, maxIndex, object, classes, onCancelSelection, onSelectedRemove, onObjectIndexSwap} = this.props;
    const {objectDescriptor} = this.state;

    return (
      <Grid className={classes.root} container={true} direction={"column"} wrap={"nowrap"}>

        <Grid className={classes.objectHeading} container justify={"space-between"} wrap={"nowrap"}>

          <Grid className={classes.objectHeadingTitle}>
            <Typography variant={"h6"}>{objectDescriptor.name} </Typography>
            <IconButton disabled={index === maxIndex} onClick={() => onObjectIndexSwap(index, index + 1)}> <ArrowUpward fontSize={"small"}/> </IconButton>
            <IconButton disabled={index === 0} onClick={() => onObjectIndexSwap(index, index - 1)}> <ArrowDownward fontSize={"small"}/> </IconButton>
          </Grid>

          <Grid>
            <Checkbox
              color={"secondary"}
              onChange={() => {
                object.isDisabled() ? object.setDisabled(false) : object.setDisabled(true);
                this.forceUpdate();
              }}
              checked={!object.isDisabled()}
            />
            <Button onClick={() => onSelectedRemove(object)}><Delete/></Button>
            <Button onClick={onCancelSelection}><Close/></Button>
          </Grid>

        </Grid>

        { this.renderControlBlock() }

      </Grid>
    );
  }

  private renderControlBlock(): ReactNode {

    const {classes} = this.props;
    const {objectDescriptor, localObjectCopy} = this.state;

    return (
      <Grid className={classes.templateConfigurationWrapper} direction={"row"} wrap={"nowrap"} container>

        <Grid className={classes.objectConfiguration} container>
          <ObjectDescriptorConfigurationBlock
            object={localObjectCopy}
            descriptor={objectDescriptor}
            {...{} as IObjectDescriptorConfigurationBlockExternalProps}
          />
        </Grid>

        <Grid className={classes.templatePreview} direction={"column"} justify={"space-between"} wrap={"nowrap"} container>

          <Grid className={classes.templateRenderer}>
            <CanvasGraphicsSingleObjectRenderer object={localObjectCopy}/>
          </Grid>

          <Grid className={classes.objectEditingControlFooter} justify={"flex-end"} container>
            <Button variant={"contained"} onClick={this.onLocalObjectReset}>Reset</Button>
            <Button variant={"contained"} onClick={this.onLocalChangesApply}>Apply</Button>
          </Grid>

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

  private getLocalCopyForPreview(object: AbstractCanvasGraphicsRenderObject<any>): AbstractCanvasGraphicsRenderObject<any> {

    const newObject = GeneralUtils.copyInstance(object);

    newObject.setDisabled(false);

    if (newObject instanceof AbstractBaseRectangleObject) {
      (newObject as AbstractBaseRectangleObject<any>).setPosition({ left: 10, top: 10, width: 80, height: 80});
    } else {
      (newObject as AbstractBaseCircleObject<any>).setPosition({ radius: 25, center: { x: 50, y: 50 }});
    }

    return newObject;
  }

}
