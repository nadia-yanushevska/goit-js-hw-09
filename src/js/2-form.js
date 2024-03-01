import '../css/styles.css';
// Constants
const form = document.querySelector('[data-login-form]');
const emailElem = form.querySelector('[data-email]');
const messageElem = form.querySelector('[data-comment]');

const LS_KEY = 'feedback-form-state';

let data = getLSObj(LS_KEY);
if (data) showData(data);

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  data[e.target.name] = e.target.value.trim();
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!emailElem.value || !messageElem.value) {
    window.alert('Email or Message cannot be empty.');
    return;
  }

  console.log(getLSObj(LS_KEY));
  clearData();

  e.target.reset();
}

function getLSObj(key) {
  let obj = {};
  try {
    obj = JSON.parse(localStorage.getItem(key)) || {};
  } catch (error) {
    console.log('Failed to parse data from local storage.');
  }
  return obj;
}

function showData({ email = '', message = '' }) {
  emailElem.value = email;
  messageElem.value = message;
}

function clearData() {
  localStorage.removeItem(LS_KEY);
  data = {};
}
