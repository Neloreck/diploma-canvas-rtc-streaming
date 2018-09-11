import {UserAuthData} from "./UserAuthData";

export class AuthState {

  public authorizing: boolean = false;
  public authData: UserAuthData = new UserAuthData();

}
