import {reduxStoreManager} from "@App/data/redux";
import {SyncReduxAction} from "@Lib/decorated-redux/types/SyncReduxAction";

export abstract class AsyncReduxAction extends SyncReduxAction {

 protected dispatch<T extends SyncReduxAction>(action: T): void {
   reduxStoreManager.getReduxStore()
     .dispatch(action);
 }

}
