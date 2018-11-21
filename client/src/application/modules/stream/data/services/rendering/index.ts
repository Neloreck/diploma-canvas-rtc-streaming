export * from "@Module/stream/data/services/rendering/canvas_objects";

import {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";

export const renderingService: RenderingService = new RenderingService();

export {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";
export {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering/ICanvasObjectDescriptor";
