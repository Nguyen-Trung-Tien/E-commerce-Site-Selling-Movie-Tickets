import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  city: "",
  isAdmin: false,
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
        city = "",
        access_token = "",
        isAdmin = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
      state.phone = phone;
      state.address = address;
      state.city = city;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.city = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
      state.access_token = false;
    },
  },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
