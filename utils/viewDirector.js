import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import startApp from './startApp';
import client from './client';
import clearDom from './clearDom';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Clear the login form so it disappears from the DOM
      document.querySelector('#login-form-container').innerHTML = '';
      // person is logged in do something...
      startApp(user);
    } else {
      // person is NOT logged in
      loginButton();
      clearDom();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
