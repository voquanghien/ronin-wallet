import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCurrencyRate } from '../../../../app/slices/currencyRateSlice';
import { selectUserInfo, updateCurrentBalanceUnit } from '../../../../app/slices/userSlice';
import { resetTransaction } from '../../../../app/slices/transactionSlice';
import { resetPopup } from '../../../../app/slices/popupSlice';
import { formatBalance } from '../../../../utils';
import { currencyEnum } from '../../../../utils/currencyEnum';
import classNames from 'classnames';
import { isObject } from 'lodash';
import './styles.scss';

const AssetsPopup = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const currencyRate = useSelector(getAllCurrencyRate);
  const currentBalanceUnit = userInfo.currentBalanceUnit;
  const balances = userInfo.balances;
  const assets = [];
  const assetElement = (elementKey, currencyImg, currencyAmount, currencyUnit) => (
    <div
      className={classNames([
        "currency-element",
        currencyUnit === currentBalanceUnit && "active"
      ])}
      key={elementKey}
      onClick={() => {
        dispatch(resetTransaction());
        dispatch(updateCurrentBalanceUnit(currencyUnit));
        dispatch(resetPopup());
      }}
    >
      <img src={currencyImg} alt={currencyUnit}/>
      <div className="currency-container">
        <div className="currency">{formatBalance(currencyAmount)} {currencyUnit}</div>
        <div className="vnd">{formatBalance(Math.round(currencyAmount / currencyRate[currencyUnit]))} VND</div>
      </div>
    </div>
  )

  if (balances && isObject(balances)) {
    Object.keys(balances).forEach((key, value) => {
      const currencyAmount = balances[key];
      const currencyImg = currencyEnum[key].img;
      assets.push(assetElement(value, currencyImg, currencyAmount, key));
    })
  }

  return (
    <div className="asset-popup">
      <div className="asset-popup-header">
        <div className="title">Assets</div>
        <div className="close" onClick={() => dispatch(resetPopup())}></div>
      </div>
      <div className="asset-popup-content">{assets}</div>
    </div>
  )
}

export default AssetsPopup;