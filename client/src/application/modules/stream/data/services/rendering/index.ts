import {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";

export const renderingService: RenderingService = new RenderingService();

// Re-export.

export * from "@Module/stream/data/services/rendering/canvas_objects";
export * from "@Module/stream/data/services/rendering/description";

export {RenderingService} from "@Module/stream/data/services/rendering/RenderingService";
