import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import './styles.scss';

const Button = props => {
  const onClick = () => {
    if (!props.disabled && props.onClick && isFunction(props.onClick))
    {
      props.onClick();
    }
  };

  return (
    <div className={classnames("btn-container", props.btnContainerCls)}>
      <button
        className={classnames([
          "btn",
          props.className,
          props.disabled && "disabled",
          props.active && "active"
        ])}
        onClick={onClick}
      >
        {props.content}
      </button>
    </div>
  );
};

Button.propTypes = {
  btnContainerCls: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  content: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  btnContainerCls: "",
  className: "",
  active: false,
  disabled: false,
  content: "",
  onClick: () => {}
}

export default Button;
