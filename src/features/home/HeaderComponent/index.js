import React from 'react';
import avatar from '../../../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const HeaderComponent = props => {
  const navigate = useNavigate();
  return (
    <div className="header-part">
      <div className="left">
        <span className="dot"></span>
        <div className="user-name">{props.name || ""}</div>
      </div>

      <div className="right">
        <img src={avatar} alt="Avatar" onClick={() => navigate("/logout")}/>
      </div>
    </div>
  );
};

export default HeaderComponent;
