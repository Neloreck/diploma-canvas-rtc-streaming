import {AuthState} from "@Main/data/store/auth/store/AuthState";
import {ThemeState} from "@Main/data/store/theme/store/ThemeState";

export interface IGlobalStoreState {

  auth: AuthState;
  theme: ThemeState;

  routing: any;

}
