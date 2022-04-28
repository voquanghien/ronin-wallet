import React from 'react';
import { useSelector } from 'react-redux';
import loadingGif from '../../assets/loading.gif';
import { selectLoading } from '../../app/slices/loadingSlice';
import './styles.scss';

const Loading = () => {
  const isLoading = useSelector(selectLoading);
  return isLoading 
    ? <div className="loading-component">
        <img src={loadingGif} alt="Loading" />
      </div>
    : null
}

export default Loading;