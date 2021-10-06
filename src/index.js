import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HttpService from './services/HttpService';
import UserService from './services/UserService';
import reportWebVitals from './reportWebVitals';

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById('root'));

UserService.initKeycloak(renderApp);
HttpService.configure();

reportWebVitals();
