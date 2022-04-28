import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receiverWallet: "",
  currentAmount: ""
};

export const transactionSlice  = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    updateReceiverWallet(state, action) {
      return {
        ...state, 
        receiverWallet: action.payload
      }
    },
    updateCurrentAmount(state, action) {
      return {
        ...state,
        currentAmount: action.payload
      }
    },
    resetTransaction: () => initialState
  }
})

export const getTransactionData = state => state.transaction;

export const {
  updateCurrentAmount,
  updateReceiverWallet,
  resetTransaction
} = transactionSlice.actions;

export default transactionSlice.reducer;