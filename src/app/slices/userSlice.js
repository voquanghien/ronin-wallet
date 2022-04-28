import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../services';
import { toggleLoading } from './loadingSlice';
import { omit, isFunction } from 'lodash';
import { currencyEnum } from '../../utils/currencyEnum';

const initialState = {
  name: "",
  isLoggedIn: false,
  walletAddress: "",
  balances: {},
  currentBalanceUnit: null
};

export const userSlice  = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfoLoaded(state, action) {
      const result = action.payload;
      return {
        ...state,
        name: result.name,
        walletAddress: result.walletAddress,
        balances: Object.assign({}, result.balances),
        currentBalanceUnit: result.balances 
          ? result.balances.hasOwnProperty(currencyEnum.USD.value)
            ? currencyEnum.USD.value
            : Object.keys(result.balances)[0]
          : null
      }
    },
    updateBalance(state, action) {
      const currentBalanceUnit = state.currentBalanceUnit;
      const newBalances = { ...state.balances, [currentBalanceUnit]: state.balances[currentBalanceUnit] - action.payload }
      return {
        ...state,
        balances: newBalances
      }
    },
    updateCurrentBalanceUnit(state, action) {
      return {
        ...state,
        currentBalanceUnit: action.payload
      }
    },
    login(state) {
      return {
        ...state,
        isLoggedIn: true
      }
    },
    logout: () => initialState
  }
})

export const isUserLoggedIn = state => state.user.isLoggedIn;

export const selectUserInfo = state => omit(Object.assign({}, state.user), ["password", "isLoggedIn"]);

export const {
  userPasswordLoaded,
  userInfoLoaded,
  updateCurrentBalanceUnit,
  updateBalance,
  login,
  logout
} = userSlice.actions;

export default userSlice.reducer;

export const updateSpecificBalance = (value, nextFunc) => dispatch => {
  dispatch(updateBalance(value));
  if (nextFunc && isFunction(nextFunc)) {
    nextFunc();
  }
}

export const getUserInfo = nextFunc => async(dispatch) => {
  dispatch(toggleLoading());
  const response = await fetchUserInfo().then(response => response.json()).then(result => result);
  dispatch(userInfoLoaded(response));
  dispatch(login())
  dispatch(toggleLoading());
  if (nextFunc && isFunction(nextFunc)) {
    nextFunc();
  }
}