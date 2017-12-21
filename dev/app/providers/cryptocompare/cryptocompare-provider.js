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

  getPrices(cryptoList, currency = this.params.defaultCurrency) {
    return new Promise((resolve, reject)=>{
      let symbolList = [];
      for (let item in cryptoList) {
        symbolList.push(cryptoList[item].symbol);
      }
      let url = this.params.urlPriceMulti.replace('$1', symbolList.join(','));
      url = url.replace('$2', currency);
      fetch(url, {
        method: 'GET'
      })
      .then((resp)=>resp.json())
      .then((data)=>{
        resolve(data);
      });
    });
  }

  getCryptoDetails(crypto, currency = this.params.defaultCurrency) {
    return new Promise((resolve, reject)=>{
      if (crypto == '') {
        reject('No crypto currency selected');
      }
      let url = this.params.urlPriceMultiFull.replace('$1', crypto);
      url = url.replace('$2', currency);
      fetch(url, {
        method: 'GET'
      })
      .then((resp)=>resp.json())
      .then((data)=>{
        resolve(data);
      });
    });
  }

  getCryptoHistoData(crypto, currency = this.params.defaultCurrency, limit = 30, timestamp = _=>Date.now()) {
    return new Promise((resolve, reject)=>{
      if (crypto == '') {
        reject('No crypto currency selected');
      }
      let url = this.params.urlHistoDay.replace('$1', crypto);
      url = url.replace('$2', currency);
      url = url.replace('$3', limit);
      url = url.replace('$4', timestamp);
      fetch(url, {
        method: 'GET'
      })
      .then((resp)=>resp.json())
      .then((data)=>{
        resolve(data);
      });
    });
  }
}
