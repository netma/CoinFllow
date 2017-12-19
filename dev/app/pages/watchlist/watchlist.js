import { watchlistSkeleton } from './watchlist.ui';
import { CryptocompareProvider } from '../../providers/cryptocompare/cryptocompare-provider';

export class WatchListPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.cryptocompare = new CryptocompareProvider();
    this.dataNode = 'watchlist';
    this.watchlistCurrencies = [];
    this.initUI();
    this.addWatchlist();
    this.updateWatchlist();
    this.deleteWatchlist();
    this.updateCryptoValues();

    //this.addCrypto('XXX');
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
    document.querySelector('a.logout').addEventListener('click', event=>{
      event.preventDefault();
      this.fb.auth.signOut();
    });
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();


    // Clicks on a crypto currency
    document.querySelector('#cryptolist').addEventListener('click', event=>{
      event.preventDefault();

      // Click on delete
      if (event.target.nodeName == 'I') {
        if (event.target.closest('a').classList.contains('delete')) {
          this.fb.firebaseRemove(this.user.uid, event.target.closest('li').id);
        }
      }
    });


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

  getPageSkeleton() {
    let data = {};
    data.userEmail = this.user.email;
    return watchlistSkeleton(data);
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
              <span>{value}</span>
              <a href="" class="delete"><i class="material-icons small">delete_forever</i></a>
            </div>
          </li>
        `);
        this.watchlistCurrencies[snapshot.key] = snapshot.val().symbol;
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
        this.watchlistCurrencies[snapshot.key] = snapshot.val().symbol;
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


    let test = {
      '-L0Q5-qtJGCGIpSAqG69': 'BTC',
      '-L0Q7Xe6dsp628j7M_Em': 'ACOIN',
      '-L0Q53opHEmQUDbJxKbL': 'ETH',
      '-L0Q582F__6tKV12-dcG': 'XRP',
      '-L0QAmmoQKeDgIb_Tmvx': 'LTC',
      '-L0QBh7Wj4d-w5h8mnEA': 'XMR'
    }

    console.log(this.watchlistCurrencies);
    console.log(test);




  }
}
