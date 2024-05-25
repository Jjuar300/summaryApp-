import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSpace from "./createSpace";
import SpaceNotes from "./SpaceNotes";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  sessionStorage,
  //  whitelist:[createSpace], 
  // //  blacklist:[SpaceNotes], 
};

const reducer = combineReducers({
  createSpace: createSpace,
  SpaceNotes: SpaceNotes, 
  middleware: [thunk],
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistedReducer,
});
