import { CONFIG } from './config';

export class CryptocompareProvider {
  constructor() {
    this.params = CONFIG;
    this.data = require('./data');
  }

  getCoinList() {
/*    return fetch(this.params.urlCoinList, {
      method: 'GET'
    })
    .then(
      res=>{
        res.json();
        console.log(res);
      }
    )
    .catch(err => alert(err.toString()));*/

    console.log(this.data);
  }

  getPrices(currencies) {
    

  }
}
