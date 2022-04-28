import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../../../app/slices/userSlice';
import { resetPopup } from '../../../../app/slices/popupSlice';
import { resetTransaction } from '../../../../app/slices/transactionSlice';
import Button from '../../../Button';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const ConfirmPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const currentBalanceUnit = userInfo.currentBalanceUnit;
  
  return (
    <div className="confirm-popup">
      <div className="confirm-popup-header">
        <div className="title">Successfully Sent</div>
      </div>
      <div className="confirm-popup-content">
        <div>Your <span>{currentBalanceUnit}</span> has been sent!</div>
        <div>Thank you for using our service</div>
      </div>
      <div className="confirm-popup-footer">
        <Button
          className="confirm-btn"
          active={true}
          content="OK"
          onClick={() => {
            dispatch(resetTransaction());
            dispatch(resetPopup());
            navigate("/home");
          }}
        />
      </div>
    </div>
  )
}

export default ConfirmPopup;