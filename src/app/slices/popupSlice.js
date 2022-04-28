import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popupType: null,
  isShow: false
};

export const popupSlice  = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup(state) {
      return {
        ...state, 
        isShow: !state.isShow
      }
    },
    updatePopupType(state, action) {
      return {
        ...state,
        popupType: action.payload
      }
    },
    resetPopup: () => initialState
  }
})

export const getPopupData = state => state.popup;

export const {
  resetPopup,
  togglePopup,
  updatePopupType
} = popupSlice.actions;

export default popupSlice.reducer;