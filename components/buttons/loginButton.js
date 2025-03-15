import { signIn } from '../../utils/auth';

// GOOGLE LOGIN BUTTON
const loginButton = () => {
  const domString = `
    <h2>Welcome to <span class="logo-span">STICKY</span>WORDS</h2>
    <h6>Login to expand your vocabulary on your terms!</h6>
    <button id="google-auth" class="btn btn-danger">GOOGLE LOGIN</button>
  `;
  document.querySelector('#login-form-container').innerHTML = domString;
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
