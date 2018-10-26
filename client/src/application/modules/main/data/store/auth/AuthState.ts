import {UserAuthData} from "./models/UserAuthData";

export class AuthState {

  public authorizing: boolean = false;
  public authData: UserAuthData = new UserAuthData();

}
