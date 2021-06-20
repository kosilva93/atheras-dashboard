import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "dataset",
    initialState: [],
    reducers: {
        loadPreview: (data, action) => {
            data.push(action.payload)
        },
    }
})

export const { loadPreview } = slice.actions;
export default slice.reducer