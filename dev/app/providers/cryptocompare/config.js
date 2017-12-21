export const CONFIG = {
  defaultCurrency: 'USD',
  urlCoinList: 'https://www.cryptocompare.com/api/data/coinlist/',
  urlPriceMulti: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=$1&tsyms=$2',
  urlPriceMultiFull: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=$1&tsyms=$2',
  urlHistoDay: 'https://min-api.cryptocompare.com/data/histoday?fsym=$1&tsym=$2&limit=$3&aggregate=1&toTs=$4'
};


/* examples:

https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD


https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH&tsyms=USD


https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=30&aggregate=3&toTs=1513782780

fsym: from symbol (crypto)
tsym: to symbol (currency : USD, EUR, CHF)
limit: number of sample returned
toTs: target timestamp
aggregate: group result by this factor

example above:
  return sample until timestamp 1513782780.
  if limit = 30 & aggregate = 1 => 1 sample by minute = samples interval 30 minutes
  if limit = 30 & aggregate = 3 => 1 sample / 3 minute = samples interval 90 minutes


https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=24&aggregate=1&toTs=1513783986

Give 1 sample per hour for 24 hours to the timestamp 1513783986


https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&toTs=1513783986

Give 1 sample per day for 30 day to the timestamp 1513783986

*/
