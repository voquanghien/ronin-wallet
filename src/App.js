import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import LoginPage from './features/login';
import LogoutPage from './features/logout';
import TransactionPage from './features/transaction';
import HomePage from './features/home';
import Loading from './components/Loading';
import Popup from './components/Popup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { selectLoading } from './app/slices/loadingSlice';
import { isUserLoggedIn } from './app/slices/userSlice';
import './App.scss';

function App() {
  const isLoading = useSelector(selectLoading);
  const isLoggedIn = useSelector(isUserLoggedIn);

  //setup routes
  const routes = [
    <Route key="login-route" path="/login" element={isLoggedIn ? <Navigate to={"/home"} /> : <LoginPage />} />,
    <Route key="any-route" path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
  ];
  if (isLoggedIn) {
    routes.push(
      <Route key="home-route" path="/home" element={<HomePage />} />,
      <Route key="transaction-route" path="/transaction" element={<TransactionPage />} />,
      <Route key="logout-route" path="/logout" element={<LogoutPage />} />
    )
  }

  return (
    <div className="App">
      <div className={classNames([
        "app-container",
        isLoading && "blur"
      ])}>
        <BrowserRouter>
          <Routes>
            {routes}
          </Routes>
          <Popup />
        </BrowserRouter>
      </div>
      <Loading />
    </div>
  );
}

export default App;
