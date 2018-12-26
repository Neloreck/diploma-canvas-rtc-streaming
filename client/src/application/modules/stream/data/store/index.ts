import {GraphicsContextManager} from "@Module/stream/data/store/graphics/GraphicsContextManager";
import {RenderingContextManager} from "@Module/stream/data/store/rendering/RenderingContextManager";
import {SourceContextManager} from "@Module/stream/data/store/source/SourceContextManager";

export const renderingContextManager: RenderingContextManager = new RenderingContextManager();
export const graphicsContextManager: GraphicsContextManager = new GraphicsContextManager();
export const sourceContextManager: SourceContextManager = new SourceContextManager();

export {RenderingContextManager, IRenderingContext} from "@Module/stream/data/store/rendering/RenderingContextManager";
export {GraphicsContextManager, IGraphicsContext} from "@Module/stream/data/store/graphics/GraphicsContextManager";
export {SourceContextManager, ISourceContext} from "@Module/stream/data/store/source/SourceContextManager";
