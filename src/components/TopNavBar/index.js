import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import './styles.scss';

const TopNavBar = props => {
  const navigate = useNavigate();
  const goBack = action => {
    if (action && isFunction(action)) {
      action();
    }
    navigate(-1);
  }
  return (
    <div className="top-nav-bar">
      <div
        className="back-arrow"
        onClick={() => goBack(props.action)}
      >
      </div>
      <div className="title">{props.title}</div>
    </div>
  )
}

TopNavBar.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func
}

TopNavBar.defaultProps = {
  title: "",
  action: () => {}
}

export default TopNavBar;