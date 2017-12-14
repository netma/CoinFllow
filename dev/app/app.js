import { LoginPage } from './pages/login/login';
import { WatchListPage } from './pages/watchlist/watchlist';
import { FirebaseProvider } from './providers/firebase/firebase-provider';

class MyApp {
  constructor() {
    this.app = document.querySelector('app');
    this.fb = new FirebaseProvider();
    this.start();
  }

  start() {
    this.fb.auth.onAuthStateChanged(user=>{
      if (user) {
        new WatchListPage(this.app, this.fb, user);
      } else {
        new LoginPage(this.app, this.fb);
      }
    });
  }
}

let myApp = new MyApp();
