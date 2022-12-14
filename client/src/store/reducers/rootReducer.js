/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";
import managerReducer from "./managerReducer";
import cartReducer from "./cartReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo", "token", "image"],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: [],
};

const managerPersistConfig = {
  ...persistCommonConfig,
  key: "manager",
  whitelist: [],
};

const cartPersistConfig = {
  ...persistCommonConfig,
  key: "cart",
  whitelist: ["Carts", ],
}

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    manager: persistReducer(managerPersistConfig, managerReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    admin: adminReducer,
  });
