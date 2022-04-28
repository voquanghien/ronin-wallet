import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input';
import { selectUserInfo } from '../../../app/slices/userSlice';
import { formatWalletAddress } from '../../../utils';
import { getTransactionData, updateCurrentAmount, updateReceiverWallet } from '../../../app/slices/transactionSlice';
import { updatePopupType, togglePopup } from '../../../app/slices/popupSlice';
import { currencyEnum } from '../../../utils/currencyEnum';
import { formatBalance } from '../../../utils';
import { PopupTypeEnum } from '../../../utils/popupEnum';
import asset from '../../../assets/asset.svg';
import { isNumber } from 'lodash';
import { inputTypeEnum } from '../../../utils/inputTypeEnum';
import './styles.scss';

const TransactionContentComponent = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const transactionInfo = useSelector(getTransactionData);
  const currentBalanceUnit = userInfo.currentBalanceUnit;
  const currentBalanceUnitAmout = userInfo.balances[currentBalanceUnit];

  const maxButtonAction = () => {
    dispatch(updateCurrentAmount(currentBalanceUnitAmout.toString()))
  }

  const updateCurrencyAmount = value => {
    let inputValue = value;
    if (parseFloat(value) > currentBalanceUnitAmout) {
      inputValue = currentBalanceUnitAmout.toString();
    }
    else if (value[0] === "0" && value[1] && isNumber(parseInt(value[1]))) {
      inputValue = value.substring(1);
    }

    dispatch(updateCurrentAmount(inputValue));
  }

  const openAssetPopup = () => {
    dispatch(updatePopupType(PopupTypeEnum.ASSETS));
    dispatch(togglePopup());
  }

  return (
    <div className="transaction-content">
      <div className="input-ele from">
        <Input
          isDisabled={true}
          leftTitle="From"
          value={`My wallet (${formatWalletAddress(userInfo.walletAddress)})`}
        />
      </div>
      <div className="input-ele to">
        <Input
          onChange={e => dispatch(updateReceiverWallet(e))}
          value={transactionInfo.receiverWallet}
          leftTitle="To"
        />
      </div>
      <div className="input-ele asset">
        <Input
          isSelection={true}
          leftTitle="Asset"
          onClick={openAssetPopup}
          inputType={inputTypeEnum.SUBMIT}
          leftElement={
            <div className="currency-container">
              <img className="currency-img" src={currencyEnum[userInfo.currentBalanceUnit].img} alt="currency icon" />
              <span className="currencty-title">{currencyEnum[userInfo.currentBalanceUnit].value}</span>
            </div>
          }
          rightElement={
            <div className="img-container">
              <img
                className="asset-icon"
                src={asset}
                alt="Asset"
                onClick={openAssetPopup}
              />
            </div>
          }
        />
      </div>
      <div className="input-ele amount">
        <Input
          value={transactionInfo.currentAmount}
          onChange={e => updateCurrencyAmount(e)}
          containErrorMsg={true}
          isError={parseFloat(transactionInfo.currentAmount) <= 0}
          errorMessage={parseFloat(transactionInfo.currentAmount) <= 0 ? "Amount must be larger than 0" : ""}
          inputType="number"
          leftTitle="Amount"
          rightTitle={`Available: ${formatBalance(currentBalanceUnitAmout)} ${currentBalanceUnit}`}
          rightElement={<div className="max-btn" onClick={maxButtonAction}><span>MAX</span></div>}
        />
      </div>
    </div>
  );
};

export default TransactionContentComponent;
