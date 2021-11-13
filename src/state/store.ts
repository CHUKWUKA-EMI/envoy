import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatsReducer";
import loginReducer from "./loginReducer";

export const store = configureStore({
  reducer: {
    authUser: loginReducer,
    chats: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
