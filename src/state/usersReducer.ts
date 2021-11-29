import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/User";

type User = IUser;
interface InitialState {
  users: User[];
}

const initialState: InitialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },

    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;
