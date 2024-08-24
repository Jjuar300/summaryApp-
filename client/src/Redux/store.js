import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSpace from "./createSpace";
import SpaceNotes from "./SpaceNotes";
import chatGpt from "./chatGpt";
import feedBack from "./feedBack";
import imageContainer from './imageContainer'; 

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  sessionStorage,
  //  whitelist:[imageContainer], 
  //  blacklist: [createSpace] 
};

const reducer = combineReducers({
  createSpace: createSpace,
  SpaceNotes: SpaceNotes, 
  chatGpt : chatGpt, 
  feedBack: feedBack, 
  middleware: [thunk],
  imageContainer: imageContainer, 
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistedReducer,
});
