import React from 'react';
import PropTypes from 'prop-types';
import deposit from '../../../assets/action/deposit.svg';
import send from '../../../assets/action/send.svg';
import swap from '../../../assets/action/swap.svg';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import './styles.scss';

const ActionComponent = (props) => {
  const iconButton = (content, image, disabled, onClick) => 
    <div
      className={classNames([
        "icon-button",
        disabled && "disabled"
      ])}
      onClick={!disabled && onClick && isFunction(onClick) ? () => onClick() : () => {}}
    >
      <div className="img-container">
        <img src={image} alt={content} />
      </div>
      <div className="content-container">{content}</div>
    </div>

  return (
    <div className="action-component">
      <div className="action-component-container">
        {iconButton("Deposit", deposit, !props.isDeposit, props.depositClick)}
        {iconButton("Send", send, !props.isSend, props.sendClick)}
        {iconButton("Swap", swap, !props.isSwap, props.swapClick)}
      </div>
    </div>
  );
};

ActionComponent.propTypes = {
  isSend: PropTypes.bool,
  isDeposit: PropTypes.bool,
  isSwap: PropTypes.bool,
  sendClick: PropTypes.func,
  depositClick: PropTypes.func,
  swapClick: PropTypes.func
}

ActionComponent.defaultProps = {
  isSend: false,
  isDeposit: false,
  isSwap: false,
  sendClick: () => {},
  depositClick: () => {},
  swapClick: () => {}
}

export default ActionComponent;
