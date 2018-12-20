import {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";

export const renderingService: RenderingService = new RenderingService();

// Re-export.

export {
  IColorSwitcherFieldDescriptor, IRangeInputFieldDescriptor, IBooleanSwitcherFieldDescriptor, EEditingFormType,
  TFieldDescriptor, ITextInputFieldDescriptor
} from "@Module/stream/data/services/rendering/fieldDescription";
export {DESCRIPTORS_MAP, ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering/description";
export {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";
