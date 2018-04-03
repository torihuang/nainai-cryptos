import CryptoCompare from '../services/cryptocompare'

export const HISTORIC_DATA_REQUESTED = 'counter/HISTORIC_DATA_REQUESTED'
export const GET_HISTORIC_DATA = 'counter/GET_HISTORIC_DATA'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

const initialState = {
  coinHistoricalData: [],
  isLoadingData: false,
  errorMessage: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HISTORIC_DATA_REQUESTED:
      return {
        ...state,
        isLoadingData: true
      }

    case GET_HISTORIC_DATA:
      return {
        ...state,
        isLoadingData: false,
        coinHistoricalData: action.coinHistoricalData,
        errorMessage: action.errorMessage,
      }

    default:
      return state
  }
}

// Get historical data from cryptocompare based on coin type
export const updateHistoricData = (coinType) => {
  return dispatch => {
    dispatch({
      type: HISTORIC_DATA_REQUESTED
    })

    return CryptoCompare.getHistoricData(coinType)
      .then((res) => {
        dispatch({
          type: GET_HISTORIC_DATA,
          errorMessage: res.error ? res.error : '',
          coinHistoricalData: res.error ? [] : res,
        })
      })
  }
}
