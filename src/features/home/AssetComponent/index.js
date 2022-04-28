import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatBalance } from '../../../utils';
import { currencyEnum } from '../../../utils/currencyEnum';
import { getAllCurrencyRate } from '../../../app/slices/currencyRateSlice';
import { updateCurrentBalanceUnit } from '../../../app/slices/userSlice';
import { omit, isObject } from 'lodash';
import './styles.scss';

const AssetComponent = props => {
  const dispatch = useDispatch();
  const currencyRate = useSelector(getAllCurrencyRate);
  const currentBalanceUnit = props.currentBalanceUnit;
  const restBalances = omit(props.balances, [currentBalanceUnit]);
  const assets = [];
  const assetElement = (elementKey, currencyImg, currencyAmount, currencyUnit) => (
    <div
      className="currency-element"
      key={elementKey}
      onClick={() => dispatch(updateCurrentBalanceUnit(currencyUnit))}
    >
      <img src={currencyImg} alt={currencyUnit}/>
      <div className="currency-container">
        <div className="currency">{`${formatBalance(currencyAmount)} ${currencyUnit}`}</div>
        <div className="vnd">{formatBalance(Math.round(currencyAmount / currencyRate[currencyUnit]))} VND</div>
      </div>
    </div>
  )

  if (restBalances && isObject(restBalances)) {
    Object.keys(restBalances).forEach((key, value) => {
      const currencyAmount = restBalances[key];
      const currencyImg = currencyEnum[key].img;
      assets.push(assetElement(value, currencyImg, currencyAmount, key));
    })
  }

  return (
    <div className="asset-component">
      <div className="title">Assets</div>
      <div className="currency-list">
        {assets}
      </div>
    </div>
  );
};

export default AssetComponent;
