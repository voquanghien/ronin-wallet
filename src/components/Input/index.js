import React from 'react';
import classnames from 'classnames';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import './styles.scss';

const Input = props => {
  const onChange = e => {
    const { value } = e.target;
    if (props.onChange && isFunction(props.onChange))
    {
      props.onChange(value);
    }
  };

  const onClick = () => {
    if (props.onClick && isFunction(props.onClick))
    {
      props.onClick();
    }
  };

  return (
    <div className={classnames('input-container', props.className)}>
      <div className="input-title">
        {props.leftTitle && <div className="left-title">{props.leftTitle}</div>}
        {props.rightTitle && <div className="right-title">{props.rightTitle}</div>}
      </div>

      <div className="input-box">
        <input
          className={classnames([
            "input-element",
            props.isDisabled && "disabled",
            props.isError && "error",
            props.isSelection && "isSelection"
          ])}
          type={props.inputType}
          value={props.value}
          onChange={onChange}
          placeholder={props.placeholder}
          disabled={props.isDisabled || props.isSelection}
          onClick={onClick}
        />

        {!!props.leftElement && <div className="left-element">{props.leftElement}</div>}

        {!!props.rightElement && <div className="right-element">{props.rightElement}</div>}
      </div>

      {props.containErrorMsg && <div className="error-message">{props.isError ? props.errorMessage: ""}</div>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  inputType: PropTypes.string,
  rightElement: PropTypes.element,
  leftElement: PropTypes.element,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isSelection: PropTypes.bool,
  containErrorMsg: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  onChange: () => {},
  onClick: () => {},
  leftTitle: '',
  rightTitle: '',
  inputType: 'text',
  rightElement: null,
  leftElement: null,
  placeholder: '',
  className: '',
  isDisabled: false,
  isSelection: false,
  containErrorMsg: false,
  isError: false,
  errorMessage: '',
};

export default Input;
