import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { axiosMiddleware } from "@/api/axiosMiddleware";

// Common Reducers
import appReducer from "./slice/appSlice";
import authReducer, { logoutUser } from "./slice/authSlice";
import userReducer from "./slice/userSlice";

const staticReducers = {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
};

const createReducer = (asyncReducers) => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

let asyncReducers = {};

const rootReducer = (state, action) => {
  if (action.type === logoutUser.type) {
    state = undefined;
  }
  return createReducer(asyncReducers)(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(axiosMiddleware),
});

store.asyncReducers = asyncReducers;

export const injectReducers = (reducers) => {
  let hasNewReducers = false;
  for (const key in reducers) {
    if (!store.asyncReducers[key]) {
      store.asyncReducers[key] = reducers[key];
      hasNewReducers = true;
    }
  }
  if (hasNewReducers) {
    store.replaceReducer(createReducer(store.asyncReducers));
  }
};

export const removeReducers = () => {
  store.asyncReducers = {};
  store.replaceReducer(createReducer(store.asyncReducers));
};

export default store;
