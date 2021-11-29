import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../interfaces/Chat";
import { IFriend } from "../interfaces/User";

type ChatType = IChat;
type User = IFriend;
interface InitialState {
  chats: ChatType[];
  selectedUser: null | User;
  openMobileView: boolean;
}

const initialState: InitialState = {
  chats: [],
  selectedUser: null,
  openMobileView: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectUser: (state, { payload }: PayloadAction<IFriend>) => {
      state.selectedUser = payload;
    },
    resetSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setMobileView: (state, { payload }: PayloadAction<boolean>) => {
      state.openMobileView = payload;
    },

    setChats: (state, { payload }: PayloadAction<ChatType[]>) => {
      state.chats = payload;
    },

    resetChats: (state) => {
      state.chats = [];
    },

    addChat: (state, { payload }: PayloadAction<ChatType>) => {
      state.chats.push(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectUser,
  setMobileView,
  setChats,
  resetChats,
  addChat,
  resetSelectedUser,
} = chatSlice.actions;
export default chatSlice.reducer;
