import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import firebase from 'firebase';

import './Sass/main.scss';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: '**************************************',
  authDomain: '*************************',
  projectId: 'webapprealchat',
  storageBucket: 'webapprealchat.appspot.com',
  messagingSenderId: '****************************',
  appId: '************************************',
  measurementId: '*********************************',
};

window.store = store;

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
