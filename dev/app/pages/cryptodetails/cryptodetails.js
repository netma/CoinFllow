import { cryptodetailsSkeleton } from './cryptodetails.ui';
import { CryptocompareProvider } from '../../providers/cryptocompare/cryptocompare-provider';
import { WatchListPage } from '../watchlist/watchlist';
import { Chart } from 'chart.js';

export class CryptoDetailsPage {
  constructor(app, fb, user, crypto) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.crypto = crypto;
    this.cryptocompare = new CryptocompareProvider();
    this.currency = this.cryptocompare.params.defaultCurrency;
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
      let cryptoData = res.DISPLAY[this.crypto][this.currency];
      document.getElementById('cryptodetails').innerHTML = `
        <li class="collection-header"><h1>${this.crypto}<span id="change24h" class="secondary-content ${(cryptoData.CHANGEPCT24HOUR < 0) ? 'negative' : 'positive'}">${(cryptoData.CHANGEPCT24HOUR < 0) ? '' : '+'}${cryptoData.CHANGEPCT24HOUR}%</span></h1></li>
        <li class="collection-item"><div>Price<span id="price" class="secondary-content">${cryptoData.PRICE}</span></div></li>
        <li class="collection-item"><div>Low (24h)<span id="low24h" class="secondary-content negative">${cryptoData.LOW24HOUR}</span></div></li>
        <li class="collection-item"><div>High (24h)<span id="high24h" class="secondary-content positive">${cryptoData.HIGH24HOUR}</span></div></li>
        <li class="collection-item"><div>Open (24h)<span id="open24h" class="secondary-content">${cryptoData.OPEN24HOUR}</span></div></li>
        <li class="collection-item"><div>Total Volume (24h)<span id="vol24h" class="secondary-content">${cryptoData.TOTALVOLUME24H}</span></div></li>
      `;
    });
  }

  addCryptoChartContent() {
    this.cryptocompare.getCryptoHistoData(this.crypto)
    .then(res=>{
      let coinHistory = res['Data'].map((a) => (a.close));
      document.getElementById('cryptochart').innerHTML = `
        <canvas id="canvas"></canvas>
      `;
      let ctx = document.getElementById('canvas').getContext('2d');

      let chartConfig = {
        type: 'line',
        data: {
          labels: coinHistory,
          datasets: [{
              data: coinHistory,
              borderColor: '#039be5',
              fill: false
            }
          ]
        },
        options: {
          title:{
              display: true,
              text: '30 Past Days History'
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return "$" + tooltipItems.yLabel.toString();
                }
              }
            },
            responsive: true,
            legend: {
              display: false
          },
          scales: {
            xAxes: [{
//              display: false

              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Days'
              }

            }],
            yAxes: [{
//              display: false
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: this.currency
              },
              ticks: {
                  stepSize: 1000
              }
            }],
          }
        }
      };
      let myChart = new Chart(ctx, chartConfig);





    });
  }

  updateCryptoDetailsContent() {

  }
}
