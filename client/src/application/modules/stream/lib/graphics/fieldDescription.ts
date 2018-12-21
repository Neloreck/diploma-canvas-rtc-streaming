// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Optional} from "@Lib/ts/types";

/*
 * EDITING FORM TYPES DESCRIPTION.
 */

export enum EEditingFormType {
  BOOLEAN, COLOR, NUMBER_FIELD, TEXT, VIDEO_DEVICE
}

// Fields.

export interface IVideoDeviceSwitcherFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => Optional<string>;
  setValue: (object: T, value: Optional<string>) => void;
}

export interface IBooleanSwitcherFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => boolean;
  setValue: (object: T, value: boolean) => void;
}

export interface IRangeInputFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  label: string;
  type: EEditingFormType;
  min?: number;
  max?: number;
  getValue: (object: T) => number;
  setValue: (object: T, value: number) => void;
}

export interface ITextInputFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => string;
  setValue: (object: T, value: string) => void;
}

export interface IColorSwitcherFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => string;
  setValue: (object: T, value: string) => void;
}

export type TFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> = IBooleanSwitcherFieldDescriptor<T> | IRangeInputFieldDescriptor<T> | IColorSwitcherFieldDescriptor<T>;
