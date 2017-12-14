import { watchlistSkeleton } from './watchlist.ui';

export class WatchListPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.initUI();
  }

  initUI() {
    // Clear existing page content
    if (document.querySelector('section')) {
      document.querySelector('section').parentNode.removeChild(document.querySelector('section'));
    }

    // Insert page content
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);

    // Load all page events
    this.loadEventUI();
  }

  loadEventUI() {
    document.querySelector('#logout').addEventListener('click', event=>{
      event.preventDefault();
      this.fb.auth.signOut();
    });
  }

  getPageSkeleton() {
    let data = {};
    data.userEmail = this.user.email;
    return watchlistSkeleton(data);
  }
}
