import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";
import {Bind} from "@redux-cbd/utils";

// View.
import {Grid, WithStyles} from "@material-ui/core";
import {SimpleRectangle} from "@Module/stream/view/components/canvas/canvas_objects/SimpleRectangle/SimpleRectangle";
import {
  BooleanSwitcher,
  ColorSwitcher, IBooleanSwitcherExternalProps,
  IColorSwitcherExternalProps, IRangeInputExternalProps,
  RangeInput
} from "@Module/stream/view/components/canvas/configuration_utils";
import {simpleRectangleEditFormStyle} from "./SimpleRectangleEditForm.Style";

// Props.
export interface ISimpleRectangleEditFormOwnProps {
  object: SimpleRectangle;
}

export interface ISimpleRectangleEditFormExternalProps extends WithStyles<typeof simpleRectangleEditFormStyle> {}
export interface ISimpleRectangleEditFormProps extends ISimpleRectangleEditFormExternalProps, ISimpleRectangleEditFormOwnProps{}

@Styled(simpleRectangleEditFormStyle)
export class SimpleRectangleEditForm extends PureComponent<ISimpleRectangleEditFormProps> {

  public render(): ReactNode {

    const {classes, object: {configuration}} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <BooleanSwitcher value={configuration.renderBackground} onToggle={this.onRenderBackgroundToggle} {...{} as IBooleanSwitcherExternalProps}/>
        <ColorSwitcher label={"Border color"} value={configuration.borderColor} onChange={this.onBorderColorChanged} {...{} as IColorSwitcherExternalProps}/>
        <ColorSwitcher label={"Background color"} value={configuration.backgroundColor} onChange={this.onBackgroundColorChanged} {...{} as IColorSwitcherExternalProps}/>
        <RangeInput value={configuration.borderWidth} onChange={this.onBorderSizeChanged} {...{} as IRangeInputExternalProps}/>

      </Grid>
    );
  }

  @Bind()
  private onRenderBackgroundToggle(value: boolean): void {

    const {object: {configuration}} = this.props;

    configuration.renderBackground = value;

    this.forceUpdate();
  }

  @Bind()
  private onBorderSizeChanged(size: number): void {

    const {object: {configuration}} = this.props;

    configuration.borderWidth = size;

    this.forceUpdate();
  }

  @Bind()
  private onBorderColorChanged(color: string): void {

    const {object: {configuration}} = this.props;

    configuration.borderColor = color;

    this.forceUpdate();
  }

 @Bind()
  private onBackgroundColorChanged(color: string): void {

    const {object: {configuration}} = this.props;

    configuration.backgroundColor = color;

    this.forceUpdate();
  }

}
