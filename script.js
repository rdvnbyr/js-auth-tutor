const mainSection = document.getElementById('main-section');
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');

const loginForm = document.getElementById('login-form');
const input_login_email = document.getElementById('login-email');
const input_login_password = document.getElementById('login-password');

const signupForm = document.getElementById('signup-form');
const input_signup_username = document.getElementById('signup-username');
const input_signup_email = document.getElementById('signup-email');
const input_signup_password = document.getElementById('signup-password');
const input_signup_repeat_password = document.getElementById('signup-repeat-password');

mainSection.style.display = 'none';
signupSection.style.display = 'none';
logoutLink.style.display = 'none';

const getUserFromStore = localStorage.getItem('js-auth-app');
const user = JSON.parse(getUserFromStore);
if (user && user.isLogin) {
  toggleFormHandler('main');
}

function toggleFormHandler(param) {
  if (param === 'login') {
    signupSection.style.display = 'none';
    loginSection.style.display = 'block';
    logoutLink.style.display = 'none';
    mainSection.style.display = 'none';
  }
  if (param === 'signup') {
    signupSection.style.display = 'block';
    loginSection.style.display = 'none';
    logoutLink.style.display = 'none';
    mainSection.style.display = 'none';
  }
  if (param === 'main') {
    signupSection.style.display = 'none';
    loginSection.style.display = 'none';
    signupLink.style.display = 'none';
    loginLink.style.display = 'none';
    mainSection.style.display = 'block';
    logoutLink.style.display = 'block';
  }
}

function logoutHandler() {
  const user = JSON.parse(localStorage.getItem('js-auth-app'));
  const newUser = {
    ...user,
    isLogin: false,
  };
  localStorage.setItem('js-auth-app', JSON.stringify(newUser));
  toggleFormHandler('login');
}

signupLink.addEventListener('click', () => toggleFormHandler('signup'));
loginLink.addEventListener('click', () => toggleFormHandler('login'));
logoutLink.addEventListener('click', logoutHandler);

//SIGUP
function signupHandler(event) {
  event.preventDefault();
  const username = input_signup_username.value;
  const email = input_signup_email.value;
  const password = input_signup_password.value;
  const repeatPassword = input_signup_repeat_password.value;
  if (password !== repeatPassword) {
    alert('Password did not match..');
    return;
  }
  const user = {
    username: username,
    email: email,
    password: password,
    isLogin: false,
  };
  localStorage.setItem('js-auth-app', JSON.stringify(user));
  input_login_email.value = email;
  input_login_password.value = password;
  toggleFormHandler('login');
}
signupForm.addEventListener('submit', signupHandler);

// LOGIN ACTION
function loginHandler(event) {
  console.log('whta is that');
  event.preventDefault();
  const email = input_login_email.value;
  const password = input_login_password.value;
  const getUser = localStorage.getItem('js-auth-app');
  console.log(getUser);
  if (!getUser) {
    alert('User not found!');
    return;
  }
  const parseUser = JSON.parse(getUser);
  if (email !== parseUser.email || password !== parseUser.password) {
    alert('Authantication is failed.');
    return;
  }
  const user = {
    ...parseUser,
    isLogin: true,
  };
  localStorage.setItem('js-auth-app', JSON.stringify(user));
  toggleFormHandler('main');
}
loginForm.addEventListener('submit', loginHandler);
