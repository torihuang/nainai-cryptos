import CryptoCompare from '../services/cryptocompare'

export const HISTORIC_DATA_REQUESTED = 'counter/HISTORIC_DATA_REQUESTED'
export const GET_HISTORIC_DATA = 'counter/GET_HISTORIC_DATA'
export const UPDATE_CURRENT_COIN_VALUE = 'counter/UPDATE_CURRENT_COIN_VALUE'

const initialState = {
  coinHistoricalData: [],
  doge: 0,
  ltc: 0,
  xmr: 0,
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

    case UPDATE_CURRENT_COIN_VALUE:
      return {
        ...state,
        doge: action.doge || state.doge,
        ltc: action.ltc || state.ltc,
        xmr: action.xmr || state.xmr,
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

// Get historical data from cryptocompare based on coin type
export const updateCurrentCoinValue = (coinType, newValue) => {
  return dispatch => {
    const newDispatchValues = { type: UPDATE_CURRENT_COIN_VALUE }
    newDispatchValues[coinType.toLowerCase()] = newValue
    dispatch(newDispatchValues)
  }
}
