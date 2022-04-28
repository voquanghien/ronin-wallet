import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import copy from '../../../assets/copy.svg';
import logoWhite from '../../../assets/logo-white.svg';
import { formatBalance } from '../../../utils';
import { getAllCurrencyRate } from '../../../app/slices/currencyRateSlice';
import './styles.scss';

const WalletComponent = props => {
  const copyText = value => {
    navigator.clipboard.writeText(value);
  };

  const currencyRate = useSelector(getAllCurrencyRate);
  const currentBalanceUnit = props.currentBalanceUnit;
  const currentBalanceUnitAmout = props.balances[currentBalanceUnit];

  return (
    <div className="wallet-part">
      <div className="wallet-header">
        <div className="wallet-info">
          <div className="title">My Wallet</div>
          <span className="wallet-number">{`(${props.walletAddress})`}</span>
        </div>

        <img
          className="copy"
          src={copy}
          alt="Copy"
          onClick={() => copyText(`${props.walletAddress}`)}
          aria-hidden="true"
        />
      </div>

      <div className="split-line"></div>

      <div className="wallet-body">
        <div className="balance">
          <div className="currency">{`${formatBalance(currentBalanceUnitAmout)} ${currentBalanceUnit}`}</div>
          <div className="vnd">{formatBalance(Math.round(currentBalanceUnitAmout / currencyRate[currentBalanceUnit]))} VND</div>
        </div>

        <img src={logoWhite} alt="white logo" />
      </div>
    </div>
  );
};

WalletComponent.propTypes = {
  walletAddress: PropTypes.string,
  balances: PropTypes.object,
  currentBalanceUnit: PropTypes.string
}

WalletComponent.defaultProps = {
  walletAddress: "",
  balances: {},
  currentBalanceUnit: ""
}

export default WalletComponent;
