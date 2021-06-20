import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "stations",
  initialState: [],
  reducers: {
    // action => action handler
    loadStations: (station, action) => {
      station.push(action.payload)
    }
  }
});

export const { loadStations } = slice.actions;
export default slice.reducer;

