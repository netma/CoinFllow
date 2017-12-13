import { userSkeleton } from './user.ui';
import { TimeComponent } from '../../components/time/time-component';

export class UserPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.initUI();
    this.loadEventUI();
    new TimeComponent();
  }

  initUI() {
    if (document.getElementsByTagName('section')[0]) {
      document.getElementsByTagName('section')[0].parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
    console.log(this.user.uid);
  }

  loadEventUI() {
    // logout
    document.querySelector('#logout').addEventListener('click', _=>{
      this.fb.auth.signOut();
    });


  }

  getPageSkeleton(user) {
    let data = {};
    data.username = this.user.email.split('@')[0];
    return userSkeleton(data);
  }

}
