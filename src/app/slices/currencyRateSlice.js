import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencyRate } from '../services';
import { toggleLoading } from './loadingSlice';

const initialState = {
  USD: 0,
  EUR: 0,
  YEN: 0,
  BTC: 0
};

export const currencyRateSlice  = createSlice({
  name: "currencyRate",
  initialState,
  reducers: {
    currencyRateLoaded(state, action) {
      const result = action.payload;
      state.USD = result.USD;
      state.EUR = result.EUR;
      state.YEN = result.JPY;
      state.BTC = result.BTC;
    }
  }
})

export const getAllCurrencyRate = state => state.currencyRate;

export const {
  currencyRateLoaded
} = currencyRateSlice.actions;

export default currencyRateSlice.reducer;

export const getCurrencyRate = () => async (dispatch) => {
  dispatch(toggleLoading());
  const response = await fetchCurrencyRate().then(response => response.json()).then(result => result.rates);
  dispatch(currencyRateLoaded(response));
  dispatch(toggleLoading());
}