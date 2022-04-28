import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { logout } from '../../app/slices/userSlice';
import logo from '../../assets/logo.svg';
import TopNavBar from '../../components/TopNavBar';
import './styles.scss';

const LogoutPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="common-page logout-page">
      <TopNavBar
        title='Logout'
      />
      <div className="logout-page-content">
        <div className="logo-container">
          <img className="logo-img" src={logo} alt="Logo" />
        </div>

        <Button 
          active={true}
          content="Logout"
          className="logout-btn"
          onClick={() => dispatch(logout())}
        />
      </div>
    </div>
  );
};

export default LogoutPage;
