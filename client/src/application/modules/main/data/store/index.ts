import {AuthContext} from "@Main/data/store/auth/AuthContext";
import {RouterContext} from "@Main/data/store/routing/RouterContext";
import {ThemeContext} from "@Main/data/store/theme/ThemeContext";

export const authContext: AuthContext = new AuthContext();
export const themeContext: ThemeContext = new ThemeContext();
export const routerContext: RouterContext = new RouterContext();

export {AuthContext, IAuthContextState} from "@Main/data/store/auth/AuthContext";
export {ThemeContext, IThemeContextState} from "@Main/data/store/theme/ThemeContext";
export {RouterContext, IRouterContextState} from "@Main/data/store/routing/RouterContext";
