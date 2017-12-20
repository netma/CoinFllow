import { cryptodetailsSkeleton } from './cryptodetails.ui';
import { CryptocompareProvider } from '../../providers/cryptocompare/cryptocompare-provider';
import { WatchListPage } from '../watchlist/watchlist';

export class CryptoDetailsPage {
  constructor(app, fb, user, crypto) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.crypto = crypto;
    this.cryptocompare = new CryptocompareProvider();
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



    this.addCryptoDetailsContent();
    this.addCryptoChartContent();


    // Load all page events
    this.loadEventUI();
  }

  loadEventUI() {
    // Logout
    document.querySelectorAll('a.logout').forEach(el=>{
      el.addEventListener('click', event=>{
        event.preventDefault();
        this.fb.auth.signOut();
      });
    });
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();

    // Close crypto currency details view and go back to watch list
    document.getElementById('cryptodetails-close').addEventListener('click', event=>{
      event.preventDefault();
      new WatchListPage(this.app, this.fb, this.user);
    });
  }

  getPageSkeleton() {
    let data = {};
    data.userEmail = this.user.email;
    data.crypto = this.crypto;
    return cryptodetailsSkeleton(data);
  }

  addCryptoDetailsContent() {
    this.cryptocompare.getCryptoDetails(this.crypto)
    .then(res=>{
      console.log(res);
    });
  }

  addCryptoChartContent() {
    this.cryptocompare.getCryptoHistoData(this.crypto)
    .then(res=>{
      console.log(res);
    });
  }
}
