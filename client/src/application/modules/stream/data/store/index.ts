import {GraphicsContext} from "@Module/stream/data/store/graphics/GraphicsContext";
import {SourceContext} from "@Module/stream/data/store/source/SourceContext";

export const graphicsContext: GraphicsContext = new GraphicsContext();
export const sourceContext: SourceContext = new SourceContext();

export {GraphicsContext, IGraphicsContextState} from "@Module/stream/data/store/graphics/GraphicsContext";
export {SourceContext, ISourceContextState} from "@Module/stream/data/store/source/SourceContext";
