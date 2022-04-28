import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { inputTypeEnum } from '../../utils/inputTypeEnum';
import Button from '../../components/Button';
import { getUserInfo } from '../../app/slices/userSlice';
import { toggleLoading } from '../../app/slices/loadingSlice';
import { fetchUserPassword } from '../../app/services';
import logo from '../../assets/logo.svg';
import eyeIcon from '../../assets/eye-icon.svg';
import eyeSlashIcon from '../../assets/eye-slash-icon.svg';
import './styles.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState(inputTypeEnum.PASSWORD);
  const [pswValue, setPswValue] = useState("");
  const [matchedPsw, setMatchedPsw] = useState(true);

  const onChange = (value) => {
    setPswValue(value);
    setMatchedPsw(true);
  }

  const changeInputType = () => {
    setInputType(inputType === inputTypeEnum.TEXT ? inputTypeEnum.PASSWORD : inputTypeEnum.TEXT);
  }

  const rightElement = () => <>
    <div className="eye-icon" onClick={changeInputType}>
      {inputType === inputTypeEnum.PASSWORD ? (
        <img src={eyeIcon} alt="Show password"></img>
      ) : (
        <img src={eyeSlashIcon} alt="Hide password"></img>
      )}
    </div>
  </>

  const onClickUnlock = async() => {
    dispatch(toggleLoading());
    const response = await fetchUserPassword().then(response => response.json()).then(result => result);
    dispatch(toggleLoading());
    if (response && response.password) {
      const psw = response.password;
      if (pswValue === psw) {
        dispatch(getUserInfo(() => navigate("/home")))
      }
      else {
        setMatchedPsw(false);
      }
    }
  };

  return (
    <div className="common-page login-page">
      <div className="logo-container">
        <img className="logo-img" src={logo} alt="Logo" />
      </div>

      <div className="title">Ronin Wallet</div>
      <div className="sub-title">Your Digital Passport</div>

      <Input
        value={pswValue}
        onChange={onChange}
        leftTitle="Enter password"
        placeholder="Password..."
        rightElement={rightElement()}
        inputType={inputType}
        containErrorMsg={true}
        isError={!matchedPsw}
        errorMessage={!matchedPsw ? "Wrong password!" : ""}
      />

      <Button 
        active={true}
        content="Unlock"
        className="unlock-btn"
        onClick={onClickUnlock}
      />
    </div>
  );
};

export default LoginPage;
