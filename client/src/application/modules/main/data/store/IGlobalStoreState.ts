import {AuthState} from "@Main/data/store/auth/AuthState";
import {ThemeState} from "@Main/data/store/theme/ThemeState";

export interface IGlobalStoreState {

  auth: AuthState;
  theme: ThemeState;

  routing: any;

}
