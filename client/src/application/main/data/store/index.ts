import {AuthContextManager} from "@Main/data/store/auth/AuthContextManager";
import {RouterContextManager} from "@Main/data/store/routing/RouterContextManager";
import {ThemeContextManager} from "@Main/data/store/theme/ThemeContextManager";

export const authContextManager: AuthContextManager = new AuthContextManager();
export const themeContextManager: ThemeContextManager = new ThemeContextManager();
export const routerContextManager: RouterContextManager = new RouterContextManager();

// @ts-ignore
window.t = authContextManager;

export {AuthContextManager, IAuthContext} from "@Main/data/store/auth/AuthContextManager";
export {ThemeContextManager, IThemeContext} from "@Main/data/store/theme/ThemeContextManager";
export {RouterContextManager, IRouterContext} from "@Main/data/store/routing/RouterContextManager";
