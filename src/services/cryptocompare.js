import axios from 'axios'

const getHistoricData = async (type) => {
  try {
    const ccUrl = `https://min-api.cryptocompare.com/data/histominute?fsym=${type}&tsym=BTC&limit=30&aggregate=1`
    const historicalData = await axios({ method: 'get', url: ccUrl })
    console.log('historicalData', historicalData);
    if (historicalData.data.Response === 'Error') return { error: 'Error retriving historical data' }
    return historicalData.data.Data
  } catch (err) {
    console.log('err retrieving historical data', err);
    return { error: 'Error retriving historical data' }
  }
}

export default {
  getHistoricData,
}
