import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../assets/avatar.svg';
import { isFunction } from 'lodash';
import './styles.scss';

const HeaderComponent = props => {
  return (
    <div className="header-part">
      <div className="left">
        <span className="dot"></span>
        <div className="user-name">{props.name || ""}</div>
      </div>

      <div className="right">
        <img
          src={avatar}
          alt="Avatar"
          onClick={props.onClick && isFunction(props.onClick) ? () => props.onClick() : () => { }} />
      </div>
    </div>
  );
};

HeaderComponent.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
}

HeaderComponent.defaultProps = {
  name: "",
  onClick: () => { }
}

export default HeaderComponent;
