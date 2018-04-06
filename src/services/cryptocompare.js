import axios from 'axios'

// Get historical data for a coin for the last 30 minutes
const getHistoricData = async (type) => {
  try {
    const ccUrl = `https://min-api.cryptocompare.com/data/histominute?fsym=${type}&tsym=BTC&limit=30&aggregate=1`
    const historicalData = await axios({ method: 'get', url: ccUrl })
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
