import {lazyLoadComponentFactory} from "@Lib/lazy_load";

export const ModuleStreaming = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"./stream"));
