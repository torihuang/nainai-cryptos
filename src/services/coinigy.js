import io from 'socket.io-client';

const socket = io.connect('wss://streamer.cryptocompare.com');
const subscription = ['2~Poloniex~DOGE~BTC', '2~Poloniex~LTC~BTC',, '2~Poloniex~XMR~BTC', ];

// Example input
// 2~Poloniex~DOGE~BTC~4~1522940008~8812.37148306~0.00352494~5465046~67360667.6564569~26.79880285~ce8
// 2~Poloniex~LTC~BTC~2~0.01759002~1522940112~0.006~0.00010554~15620213~12788.296706489999~222.09278973999997~ce9
// 2~Poloniex~XMR~BTC~1~0.02541001~1522940122~0.03158991~0.00080269~16633589~5627.034454879999~140.67427241000001~ce9
const _getCurrentValue = (message) => {
  const messageAsArray = message.split('~')
  if (!messageAsArray || !messageAsArray.length || messageAsArray.length < 5) return null
  return {
    coinType: messageAsArray[2],
    coinValue: messageAsArray[5],
  }
}

// Start socket connection
const startCoinCostWatch = (updateCurrentCoinValue) => {
  socket.emit('SubAdd', { subs: subscription });
  socket.on("m", function(message) {
    const newCoinValues = _getCurrentValue(message)
    if (newCoinValues) updateCurrentCoinValue(newCoinValues.coinType, newCoinValues.coinValue)
  });
}

// End socket connection
const endCoinCostWatch = () => {
  socket.emit('SubRemove', { subs: subscription });
}

export default {
  startCoinCostWatch,
  endCoinCostWatch,
}
