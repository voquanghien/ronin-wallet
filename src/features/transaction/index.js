import React from 'react';
import { useDispatch } from 'react-redux';
import { resetTransaction } from '../../app/slices/transactionSlice';
import TopNavBar from '../../components/TopNavBar';
import TransactionContent from './transactionContent';
import TransactionFooter from './transactionFooter';

import './styles.scss';

const TransactionPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="common-page transaction-page">
      <TopNavBar
        title='Send Assets'
        action={() => dispatch(resetTransaction())}
      />
      <TransactionContent />
      <TransactionFooter />
    </div>
  );
};

export default TransactionPage;
