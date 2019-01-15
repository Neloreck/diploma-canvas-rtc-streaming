/* tslint:disable: typedef */

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// View.
import {
  DesktopFrame, ImageBlock,
  SimpleCircle,
  SimpleFixedRectangle, SimpleRectangle,
  VideoFrame
} from "@Module/stream/lib/graphics";
import {EEditingFormType, TFieldDescriptor} from "@Module/stream/lib/graphics/fieldDescription";

// Data.

// Object.

export interface ICanvasObjectDescriptor<T extends AbstractCanvasGraphicsRenderObject<any>> {
  name: string;
  description: string;
  prototype: T;
  formDescriptor: Array<TFieldDescriptor<T>>;
}

/*
 * OBJECTS DESCRIPTORS.
 */

export const DESCRIPTORS_MAP = {

  [SimpleRectangle.name]: {
    description: "Simple rectangle",
    formDescriptor: [
      {
        getValue: (object: SimpleRectangle): boolean => object.config.renderBackground,
        label: "Render background",
        setValue: (object: SimpleRectangle, render: boolean) => object.config.renderBackground = render,
        type: EEditingFormType.BOOLEAN
      },
      {
        getValue: (object: SimpleRectangle): string => object.config.backgroundColor,
        label: "Background color",
        setValue: (object: SimpleRectangle, color: string) => object.config.backgroundColor = color,
        type: EEditingFormType.COLOR
      },
      {
        getValue: (object: SimpleRectangle): number => object.config.borderWidth,
        label: "Border width",
        setValue: (object: SimpleRectangle, width: number) => object.config.borderWidth = width,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: SimpleRectangle): string => object.config.borderColor,
        label: "Border color",
        setValue: (object: SimpleRectangle, color: string) => object.config.borderColor = color,
        type: EEditingFormType.COLOR
      }
    ],
    name: "Rectangle",
    prototype: SimpleRectangle.prototype,
  },

  [SimpleFixedRectangle.name]: {
    description: "Fixed position rectangle",
    formDescriptor: [
      {
        getValue: (object: SimpleFixedRectangle): boolean => object.config.renderBackground,
        label: "Render background",
        setValue: (object: SimpleFixedRectangle, render: boolean) => object.config.renderBackground = render,
        type: EEditingFormType.BOOLEAN
      },
      {
        getValue: (object: SimpleFixedRectangle): string => object.config.backgroundColor,
        label: "Background color",
        setValue: (object: SimpleFixedRectangle, color: string) => object.config.backgroundColor = color,
        type: EEditingFormType.COLOR
      },
      {
        getValue: (object: SimpleFixedRectangle): number => object.config.borderWidth,
        label: "Border width",
        setValue: (object: SimpleFixedRectangle, width: number) => object.config.borderWidth = width,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: SimpleFixedRectangle): string => object.config.borderColor,
        label: "Border color",
        setValue: (object: SimpleFixedRectangle, color: string) => object.config.borderColor = color,
        type: EEditingFormType.COLOR
      }
    ],
    name: "Rectangle Fixed",
    prototype: SimpleFixedRectangle.prototype,
  },

  [SimpleCircle.name]: {
    description: "Simple circle",
    formDescriptor: [
      {
        getValue: (object: SimpleCircle): boolean => object.config.renderBackground,
        label: "Render background",
        setValue: (object: SimpleCircle, render: boolean) => object.config.renderBackground = render,
        type: EEditingFormType.BOOLEAN
      },
      {
        getValue: (object: SimpleCircle): string => object.config.backgroundColor,
        label: "Background color",
        setValue: (object: SimpleCircle, color: string) => object.config.backgroundColor = color,
        type: EEditingFormType.COLOR
      },
      {
        getValue: (object: SimpleCircle): number => object.config.borderWidth,
        label: "Border width",
        setValue: (object: SimpleCircle, width: number) => object.config.borderWidth = width,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: SimpleCircle): string => object.config.borderColor,
        label: "Border color",
        setValue: (object: SimpleCircle, color: string) => object.config.borderColor = color,
        type: EEditingFormType.COLOR
      }
    ],
    name: "Circle",
    prototype: SimpleCircle.prototype
  },

  [VideoFrame.name]: {
    description: "Additional video.",
    formDescriptor: [
      {
        getValue: (object: VideoFrame): boolean => object.config.renderBorder,
        label: "Render border",
        setValue: (object: VideoFrame, render: boolean) => object.config.renderBorder = render,
        type: EEditingFormType.BOOLEAN
      },
      {
        getValue: (object: VideoFrame): number => object.config.borderWidth,
        label: "Border width",
        setValue: (object: VideoFrame, width: number) => object.config.borderWidth = width,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: VideoFrame): string => object.config.videoDevice,
        label: "Device",
        setValue: (object: VideoFrame, device: string) => object.setVideoDevice(device),
        type: EEditingFormType.VIDEO_DEVICE
      }
    ],
    name: "Video Frame",
    prototype: VideoFrame.prototype
  },

  [DesktopFrame.name]: {
    description: "Desktop casting",
    formDescriptor: [],
    name: "Desktop Frame",
    prototype: DesktopFrame.prototype
  },

  [ImageBlock.name]: {
    description: "Image display into stream",
    formDescriptor: [
      {
        getValue: (object: ImageBlock): number => object.config.width,
        label: "Width",
        max: 1280,
        min: 0,
        setValue: (object: ImageBlock, width: number) => object.config.width = width,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: ImageBlock): number => object.config.height,
        label: "Height",
        max: 720,
        min: 0,
        setValue: (object: ImageBlock, height: number) => object.config.height = height,
        type: EEditingFormType.NUMBER_FIELD
      },
      {
        getValue: (object: ImageBlock): string => object.config.imageSrc,
        label: "Source",
        setValue: (object: ImageBlock, src: string) => object.setNewUrl(src),
        type: EEditingFormType.TEXT
      }
    ],
    name: "Image Frame",
    prototype: ImageBlock.prototype
  }

};
