import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Optional} from "@Lib/ts/types";

// Data.
import {
  BooleanSwitcher,
  ColorSwitcher,
  IBooleanSwitcherExternalProps, IColorSwitcherExternalProps, IRangeInputExternalProps, ITextInputExternalProps,
  NoControlProvidedForm, RangeInput, TextInput
} from "@Module/stream/lib/graphics";
import {
  IVideoDeviceSwitcherExternalProps,
  VideoDeviceSwitcher
} from "@Module/stream/lib/graphics/configuration/VideoDeviceSwitcher";
import {ICanvasObjectDescriptor} from "@Module/stream/lib/graphics/description";
import {
  EEditingFormType,
  IBooleanSwitcherFieldDescriptor,
  IColorSwitcherFieldDescriptor,
  IRangeInputFieldDescriptor,
  ITextInputFieldDescriptor, IVideoDeviceSwitcherFieldDescriptor,
  TFieldDescriptor,
} from "@Module/stream/lib/graphics/fieldDescription";

export interface INoControlProvidedFormProps {
  object: AbstractCanvasGraphicsRenderObject<any>;
  descriptor: ICanvasObjectDescriptor<any>;
}

export class CanvasObjectConfigurationFormBuilder extends PureComponent<INoControlProvidedFormProps> {

  public render(): ReactNode {

    const {descriptor, object} = this.props;

    if (descriptor.formDescriptor.length === 0) {
      return (<NoControlProvidedForm object={object}/>);
    } else {
      return this.renderCompleteForm();
    }
  }

  private renderCompleteForm(): Array<ReactNode> {

    const {descriptor, object} = this.props;

    return descriptor.formDescriptor.map((fieldDescriptor: TFieldDescriptor<any>, idx: number) => {

      switch (fieldDescriptor.type) {

        case EEditingFormType.BOOLEAN:
          return <BooleanSwitcher
            key={idx + fieldDescriptor.type + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IBooleanSwitcherFieldDescriptor<any>).getValue(object)}
            onToggle={(toggle: boolean): void => { (fieldDescriptor as IBooleanSwitcherFieldDescriptor<any>).setValue(object, toggle); this.forceUpdate(); } }
            {...{} as IBooleanSwitcherExternalProps}
          />;

        case EEditingFormType.COLOR:
          return <ColorSwitcher
            key={idx + fieldDescriptor.type + fieldDescriptor.label + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IColorSwitcherFieldDescriptor<any>).getValue(object)}
            onChange={(color: string): void => { (fieldDescriptor as IColorSwitcherFieldDescriptor<any>).setValue(object, color); this.forceUpdate(); } }
            {...{} as IColorSwitcherExternalProps}
          />;

        case EEditingFormType.NUMBER_FIELD:
          return <RangeInput
            key={idx + fieldDescriptor.type + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IRangeInputFieldDescriptor<any>).getValue(object)}
            onChange={(value: number): void => { (fieldDescriptor as IRangeInputFieldDescriptor<any>).setValue(object, value); this.forceUpdate(); } }
            min={(fieldDescriptor as IRangeInputFieldDescriptor<any>).min}
            max={(fieldDescriptor as IRangeInputFieldDescriptor<any>).max}
            {...{} as IRangeInputExternalProps}
          />;

        case EEditingFormType.TEXT:
          return <TextInput
            key={idx + fieldDescriptor.type + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as ITextInputFieldDescriptor<any>).getValue(object)}
            onChange={(value: string): void => { (fieldDescriptor as ITextInputFieldDescriptor<any>).setValue(object, value); this.forceUpdate(); } }
            {...{} as ITextInputExternalProps}
          />;

        case EEditingFormType.VIDEO_DEVICE:
          return <VideoDeviceSwitcher
            key={idx + fieldDescriptor.type + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IVideoDeviceSwitcherFieldDescriptor<any>).getValue(object)}
            onChange={(value: Optional<string>): void => { (fieldDescriptor as IVideoDeviceSwitcherFieldDescriptor<any>).setValue(object, value); this.forceUpdate(); } }
            {...{} as IVideoDeviceSwitcherExternalProps}
          />;

        default:
          throw new Error("Unknown field descriptor for " + fieldDescriptor.type);
      }
    });
  }

}
