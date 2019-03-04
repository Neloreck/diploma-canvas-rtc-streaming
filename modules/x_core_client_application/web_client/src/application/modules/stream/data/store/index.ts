import { BookmarkContextManager } from "@Module/stream/data/store/BookmarkContextManager";
import { GraphicsContextManager } from "@Module/stream/data/store/GraphicsContextManager";
import { LiveContextManager } from "@Module/stream/data/store/live/LiveContextManager";
import { RenderingContextManager } from "@Module/stream/data/store/RenderingContextManager";
import { SourceContextManager } from "@Module/stream/data/store/SourceContextManager";

export const bookmarkContextManager: BookmarkContextManager = new BookmarkContextManager();
export const renderingContextManager: RenderingContextManager = new RenderingContextManager();
export const graphicsContextManager: GraphicsContextManager = new GraphicsContextManager();
export const sourceContextManager: SourceContextManager = new SourceContextManager();
export const liveContextManager: LiveContextManager = new LiveContextManager();

export * from "@Module/stream/data/store/live/LiveContextManager";
export * from "@Module/stream/data/store/RenderingContextManager";
export * from "@Module/stream/data/store/GraphicsContextManager";
export * from "@Module/stream/data/store/SourceContextManager";
export * from "@Module/stream/data/store/BookmarkContextManager";
