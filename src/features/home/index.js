import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import WalletComponent from './WalletComponent';
import ActionComponent from './ActionComponent';
import AssetComponent from './AssetComponent';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../app/slices/userSlice';
import './styles.scss';

const HomePage = () => {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  return (
    <div className="common-page home-page">
      <div className="combine-element">
        <div className="combine-container">
          <HeaderComponent
            name={userInfo.name}
            onClick={() => navigate("/logout")}
          />

          <WalletComponent
            walletAddress={userInfo.walletAddress}
            balances={userInfo.balances}
            currentBalanceUnit={userInfo.currentBalanceUnit}
          />

          <ActionComponent
            isSend={true}
            sendClick={() => navigate("/transaction")}
          />
        </div>
        <div className="under-background"></div>
      </div>

      <AssetComponent
        balances={userInfo.balances}
        currentBalanceUnit={userInfo.currentBalanceUnit}
      />
    </div>
  );
};

export default HomePage;
