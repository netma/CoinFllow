import { watchlistSkeleton } from './watchlist.ui';
import { CryptocompareProvider } from '../../providers/cryptocompare/cryptocompare-provider';
import { CryptoDetailsPage } from '../cryptodetails/cryptodetails';

export class WatchListPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.cryptocompare = new CryptocompareProvider();
    this.dataNode = 'watchlist';
    this.listReady = false;
    this.watchlistCurrencies = {};
    this.initUI();
    this.addWatchlist();
    this.updateWatchlist();
    this.deleteWatchlist();
    this.updateCryptoValues();

//TODO
    //this.addCrypto('XRP');
    this.cryptocompare.getCoinList();
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
    // Logout
    document.querySelectorAll('a.logout').forEach(el=>{
      el.addEventListener('click', event=>{
        event.preventDefault();
        this.fb.auth.signOut();
      });
    });
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();

    // Clicks on a crypto currency
    document.querySelector('#cryptolist').addEventListener('click', event=>{
      event.preventDefault();

      // Click on a crypto currency
      if (event.target.nodeName == 'A') {
        let crypto = event.target.innerHTML;
        new CryptoDetailsPage(this.app, this.fb, this.user, crypto);
      }

      // Click on delete
      if (event.target.nodeName == 'I') {
        if (event.target.closest('a').classList.contains('delete')) {
          this.fb.firebaseRemove(this.user.uid, event.target.closest('li').id);
        }
      }
    });
  }

  getPageSkeleton() {
    let data = {};
    data.userEmail = this.user.email;
    return watchlistSkeleton(data);
  }

  // save new link
  addCrypto(symbol) {
    if (symbol == '') {
      return;
    }
    let data = {};
    data['symbol'] = symbol;
    this.fb.dataNode = this.dataNode;
    this.fb.firebasePush(this.user.uid, data);
  }

  // Add crypto currency to watch list
  addWatchlist() {
    this.fb.dataNode = this.dataNode;
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_added', snapshot=>{
        document.querySelector('#cryptolist').insertAdjacentHTML('beforeend', `
          <li id="${snapshot.key}" class="collection-item">
            <a href="">${snapshot.val().symbol}</a>
            <div class="secondary-content">
              <span class="price">-</span>
              <a href="" class="delete"><i class="material-icons small">delete_forever</i></a>
            </div>
          </li>
        `);
        this.watchlistCurrencies[snapshot.key] = { symbol: snapshot.val().symbol };
        this.listReady = true;
      });
  }

  // Update crypto currency in watch list
  updateWatchlist() {
    this.fb.dataNode = this.dataNode;
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_changed', snapshot=>{
        document.querySelector(`#${snapshot.key} a`).innerHTML = snapshot.val().symbol;
        this.watchlistCurrencies[snapshot.key] = { symbol: snapshot.val().symbol };
    });
  }

  // Delete crypto currency from watch list
  deleteWatchlist() {
    this.fb.dataNode = this.dataNode;
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_removed', snapshot=>{
        document.getElementById(snapshot.key).parentElement.removeChild(document.getElementById(snapshot.key));
        delete this.watchlistCurrencies[snapshot.key];
    });
  }

  updateCryptoValues() {
    if (this.listReady) {
      this.cryptocompare.getPrices(this.watchlistCurrencies)
      .then(res=>{
        for (let i in this.watchlistCurrencies) {
          if (res[this.watchlistCurrencies[i].symbol]) {
            if (document.querySelector(`#${i}`)) {
              document.querySelector(`#${i} .price`).innerHTML = res[this.watchlistCurrencies[i].symbol].USD;
            }
          }
        }
      });
    }
    setTimeout(_=>this.updateCryptoValues(), (!this.listReady) ? 1000 : 10000);
  }
}
