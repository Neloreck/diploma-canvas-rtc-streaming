// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

/*
 * EDITING FORM TYPES DESCRIPTION.
 */

export enum EEditingFormType {
  BOOLEAN, COLOR, NUMBER_FIELD
}

// Fields.

export interface IBooleanSwitcherFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => boolean;
  setValue: (object: T, value: boolean) => void;
}

export interface IRangeInputFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject> {
  label: string;
  type: EEditingFormType;
  min?: number;
  max?: number;
  getValue: (object: T) => number;
  setValue: (object: T, value: number) => void;
}

export interface IColorSwitcherFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject> {
  label: string;
  type: EEditingFormType;
  getValue: (object: T) => string;
  setValue: (object: T, value: string) => void;
}

export type TFieldDescriptor<T extends AbstractCanvasGraphicsRenderObject> = IBooleanSwitcherFieldDescriptor<T> | IRangeInputFieldDescriptor<T> | IColorSwitcherFieldDescriptor<T>;
