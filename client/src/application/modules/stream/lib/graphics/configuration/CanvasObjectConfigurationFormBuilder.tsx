import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// Data.
import {
  EEditingFormType, IBooleanSwitcherFieldDescriptor,
  ICanvasObjectDescriptor, IColorSwitcherFieldDescriptor, IRangeInputFieldDescriptor, TFieldDescriptor,
} from "@Module/stream/data/services/rendering";
import {
  BooleanSwitcher,
  ColorSwitcher,
  IBooleanSwitcherExternalProps, IColorSwitcherExternalProps,
  NoControlProvidedForm, RangeInput
} from "@Module/stream/lib/graphics";

export interface INoControlProvidedFormProps {
  object: AbstractCanvasGraphicsRenderObject;
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
            onToggle={(toggle: boolean) => { (fieldDescriptor as IBooleanSwitcherFieldDescriptor<any>).setValue(object, toggle); this.forceUpdate(); } }
            {...{} as IBooleanSwitcherExternalProps}
          />;

        case EEditingFormType.COLOR:
          return <ColorSwitcher
            key={idx + fieldDescriptor.type + fieldDescriptor.label + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IColorSwitcherFieldDescriptor<any>).getValue(object)}
            onChange={(color: string) => { (fieldDescriptor as IColorSwitcherFieldDescriptor<any>).setValue(object, color); this.forceUpdate(); } }
            {...{} as IColorSwitcherExternalProps}
          />;

        case EEditingFormType.NUMBER_FIELD:
          return <RangeInput
            key={idx + fieldDescriptor.type + object.getId()}
            label={fieldDescriptor.label}
            value={(fieldDescriptor as IRangeInputFieldDescriptor<any>).getValue(object)}
            onChange={(value: number) => { (fieldDescriptor as IRangeInputFieldDescriptor<any>).setValue(object, value); this.forceUpdate(); } }
            min={(fieldDescriptor as IRangeInputFieldDescriptor<any>).min}
            max={(fieldDescriptor as IRangeInputFieldDescriptor<any>).max}
            {...{} as IColorSwitcherExternalProps}
          />;

        default:
          throw new Error("Unknown field descriptor for " + fieldDescriptor.type);
      }
    });
  }

}
