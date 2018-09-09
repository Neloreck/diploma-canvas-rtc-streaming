import {AuthState} from "@Store/auth/store/AuthState";
import {ThemeState} from "@Store/theme/store/ThemeState";

export interface IGlobalStoreState {
  auth: AuthState;
  routing: any;
  theme: ThemeState;

}
