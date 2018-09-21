import {UserAuthData} from "@Main/data/store/auth/store/UserAuthData";

export class AuthState {

  public authorizing: boolean = false;
  public authData: UserAuthData = new UserAuthData();

}
