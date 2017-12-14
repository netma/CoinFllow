import { loginSkeleton } from './login.ui';

export class LoginPage {
  constructor(app, fb) {
    this.app = app;
    this.fb = fb;
    this.title = 'CoinFllow';
    this.initUI();
  }

  initUI() {
    if (document.getElementsByTagName('section')[0]) {
      document.getElementsByTagName('section')[0].parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);

    this.loadEventUI();
  }

  getPageSkeleton() {
    let data = {};
    data.title = this.title;
    return loginSkeleton(data);
  }

  loadEventUI() {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event=>this.onLogin(event));

    // switchForm
    document.getElementById('switchForm').addEventListener('click', event=> {
      event.preventDefault();
      switch ([...document.getElementById('switchForm').classList].includes('create')) {
        case false:
          document.getElementById('switchForm').classList.toggle('create');
          document.getElementById('switchForm').innerHTML = 'Already have an account? Log In.';
          document.querySelector('#email-sign').innerHTML = 'Sign up';
          document.querySelector('#google-sign').innerHTML = 'Sign up with Google';
          break;
        case true:
          document.getElementById('switchForm').classList.toggle('create');
          document.getElementById('switchForm').innerHTML = 'No account? Sign up!';
          document.querySelector('#email-sign').innerHTML = 'Log In';
          document.querySelector('#google-sign').innerHTML = 'Sign In with Google';
          break;
        default:
      }
    });

    // Sign with Google
    document.getElementById('google-sign').addEventListener('click', _=>this.fb.signWithGoogle());
  }

  onLogin(event) {
    event.preventDefault();
    let validationInput = 0;
    let formData = {};
    let formInputs = document.forms[0].elements;
    for (var i = 0; i < formInputs.length; i++) {
      if (formInputs[i].value) {
        formData[formInputs[i].name] = formInputs[i].value;
        validationInput++;
      }
    }
    if (validationInput === 2) {
      ([...document.getElementById('switchForm').classList].includes('create'))
      ? this.fb.createEmailAccount(formData.email, formData.password)
      : this.fb.loginEmailAccount(formData.email, formData.password);
    }
  }
}
