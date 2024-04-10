import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../types";

interface AuthState {
  userInfo: UserInfo | null;
}
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state: AuthState) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const getUserInfo = () => (state: { auth: AuthState }) =>
  state.auth.userInfo;
const { reducer: authReducer, actions } = authSlice;
export const { setCredentials, logout } = actions;
export default authReducer;
