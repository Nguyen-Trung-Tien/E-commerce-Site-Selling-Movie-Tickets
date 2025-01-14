import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        avatar = "",
        phone = "",
        _id = "",
        address = "",
        access_token = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
      state.phone = phone;
      state.address = address;
      state.id = _id;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
