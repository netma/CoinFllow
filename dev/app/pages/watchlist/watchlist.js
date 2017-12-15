import { watchlistSkeleton } from './watchlist.ui';

export class WatchListPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.dataNode = 'watchlist';
    this.initUI();
    this.addWatchlist();
    this.deleteWatchlist();
    //this.addCrypto('ETH');
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

      if (event.target.nodeName == 'I') {

        console.log(event.target.closest('a').classList.contains('delete'));

      }



/*      if (event.target.nodeName != 'BUTTON') {
        return;
      }
      let li = event.target.closest('li');
      switch (event.target.className) {
        case 'delete':
          this.fb.firebaseRemove(this.user.uid, li.id);
          break;
      }*/
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

  // Add crypto currencies to watch list
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
      });
  }

  // Delete crypto currencies from watch list
  deleteWatchlist() {
    this.fb.dataNode = this.dataNode;
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_removed', snapshot=>{
        document.getElementById(snapshot.key).parentElement.removeChild(document.getElementById(snapshot.key));
    });
  }
}
