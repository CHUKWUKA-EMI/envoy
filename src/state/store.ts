import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatsReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";

export const store = configureStore({
  reducer: {
    authUser: loginReducer,
    chats: chatsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
