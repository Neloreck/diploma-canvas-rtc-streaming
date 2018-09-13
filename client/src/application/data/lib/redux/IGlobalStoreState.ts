import {AuthState} from "@Store/auth/store/AuthState";
import {InputSourceState} from "@Store/input_source/store/InputSourceState";
import {ThemeState} from "@Store/theme/store/ThemeState";

export interface IGlobalStoreState {

  auth: AuthState;
  inputSource: InputSourceState;
  theme: ThemeState;

  routing: any;

}
