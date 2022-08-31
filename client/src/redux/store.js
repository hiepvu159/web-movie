import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["register"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
export let persistor = persistStore(store);
