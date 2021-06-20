import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    userAdded: (user, action) => {
      user.access_token = action.payload.access_token;
      user.refresh_token = action.payload.refresh_token
      
    }
  }
});

export const { userAdded } = slice.actions;
export default slice.reducer;
