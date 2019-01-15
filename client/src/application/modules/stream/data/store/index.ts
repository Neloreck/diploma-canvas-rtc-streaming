import {GraphicsContextManager} from "@Module/stream/data/store/GraphicsContextManager";
import {LiveContextManager} from "@Module/stream/data/store/LiveContextManager";
import {RenderingContextManager} from "@Module/stream/data/store/RenderingContextManager";
import {SourceContextManager} from "@Module/stream/data/store/SourceContextManager";

export const renderingContextManager: RenderingContextManager = new RenderingContextManager();
export const graphicsContextManager: GraphicsContextManager = new GraphicsContextManager();
export const sourceContextManager: SourceContextManager = new SourceContextManager();
export const liveContextManager: LiveContextManager = new LiveContextManager();

export {LiveContextManager, ILiveContext} from "@Module/stream/data/store/LiveContextManager";
export {RenderingContextManager, IRenderingContext} from "@Module/stream/data/store/RenderingContextManager";
export {GraphicsContextManager, IGraphicsContext} from "@Module/stream/data/store/GraphicsContextManager";
export {SourceContextManager, ISourceContext} from "@Module/stream/data/store/SourceContextManager";
