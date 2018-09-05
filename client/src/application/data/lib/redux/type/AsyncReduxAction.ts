import {reduxStoreManager} from "../index";
import {SyncReduxAction} from "../../../../../lib/decorated-redux/index";

export abstract class AsyncReduxAction extends SyncReduxAction {

 protected dispatch<T extends SyncReduxAction>(action: T): void {
   reduxStoreManager.getReduxStore()
     .dispatch(action);
 }

}
