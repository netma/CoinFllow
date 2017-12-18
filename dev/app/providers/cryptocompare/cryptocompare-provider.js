import { CONFIG } from './config';

export class CryptocompareProvider {
  constructor() {
    this.params = CONFIG;
    this.data = require('./data');
  }

  getCoinList() {
  /*    return new Promise((resolve, reject)=>{
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.params.queryRandomPictureUrl + this.params.applicationId);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.onerror = () => reject(Error(xhr.statusText));
      xhr.send();
    });*/

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
}
