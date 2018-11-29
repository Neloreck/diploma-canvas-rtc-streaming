import {GraphicsContextManager} from "@Module/stream/data/store/graphics/GraphicsContextManager";
import {SourceContextManager} from "@Module/stream/data/store/source/SourceContextManager";

export const graphicsContextManager: GraphicsContextManager = new GraphicsContextManager();
export const sourceContextManager: SourceContextManager = new SourceContextManager();

export {GraphicsContextManager, IGraphicsContext} from "@Module/stream/data/store/graphics/GraphicsContextManager";
export {SourceContextManager, ISourceContext} from "@Module/stream/data/store/source/SourceContextManager";
