import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { updateSpecificBalance } from '../../../app/slices/userSlice';
import { resetTransaction, getTransactionData } from '../../../app/slices/transactionSlice';
import { togglePopup, updatePopupType } from '../../../app/slices/popupSlice';
import { PopupTypeEnum } from '../../../utils/popupEnum';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';

const SendFooterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactionInfo = useSelector(getTransactionData);

  const goBack = () => {
    dispatch(resetTransaction());
    navigate(-1);
  };

  const sendAction = () => {
    dispatch(updateSpecificBalance(transactionInfo.currentAmount, () => {
      dispatch(updatePopupType(PopupTypeEnum.CONFIRM));
      dispatch(togglePopup());
    }))
  }

  return (
    <div className="transaction-footer">
      <div className="button-container">
        <Button
          className="button-element"
          content="Cancel"
          onClick={goBack}
        />
      </div>
      <div className="button-container">
        <Button
          className="button-element"
          active={true}
          disabled={!transactionInfo.receiverWallet || !transactionInfo.currentAmount || parseFloat(transactionInfo.currentAmount) <= 0}
          content="Send"
          onClick={sendAction}
        />
      </div>
    </div>
  );
};

export default SendFooterComponent;
