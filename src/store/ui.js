// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: 'responsive'
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return {...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: "ui",
  initialState: {
    sidebarShow: 'responsive'
  },
  reducers: {
    set: (state, action) => {
      state = action.payload.sidebarShow
    }
  }
})

export const { set } = slice.actions;
export default slice.reducer