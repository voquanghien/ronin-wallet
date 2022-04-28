import React from 'react';
import { useSelector } from 'react-redux';
import AssetPopup from './PopupContents/Assets';
import ConfirmPopup from './PopupContents/Confirm';
import { getPopupData } from '../../app/slices/popupSlice';
import { PopupTypeEnum } from '../../utils/popupEnum';
import './styles.scss';

const Popup = () => {
  const popupData = useSelector(getPopupData);
  const popupElement = () => {
    switch (popupData.popupType) {
      case PopupTypeEnum.ASSETS:
        return <AssetPopup />;
      case PopupTypeEnum.CONFIRM:
        return <ConfirmPopup />;
      default:
        return null;
    }
  }
  return (
    popupData.isShow 
      ? <div className="popup-component">
          <div className="popup-container">
            {popupElement()}
          </div>
        </div>
      : null
  )
}

export default Popup;