import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUserProfile } from "../interfaces/User";

type loginState = IUserProfile;
interface InitialState {
  user: loginState;
}
const User: loginState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  imageUrl: "",
  imagekit_id: "",
  authtoken: "",
  role: "",
  createdAt: "",
};

const initialState: InitialState = {
  user: User,
};

export const userSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<IUserProfile>) => {
      state.user = payload;
      localStorage.setItem("envoy_user", JSON.stringify(payload));
    },

    logout: (state: InitialState) => {
      state.user = User;
      localStorage.removeItem("envoy_user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.authUser;
export default userSlice.reducer;
