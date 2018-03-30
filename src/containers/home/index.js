import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import Images from '../../images'
import './style.css'

const allAltCoins = [
  {
    type: 'doge',
    name: 'Dogecoin',
  },
  {
    type: 'litecoin',
    name: 'Litecoin',
  },
  {
    type: 'monero',
    name: 'Monero',
  }
]

const AltCoin = props => (
  <div className='altCoinContainer'>
    <img src={Images[props.coin.type]} className="altCoinLogo"/>
  </div>
)

const getAllAltCoins = (props) => {
  return allAltCoins.map((coin) => {
    return (
      <AltCoin coin={coin} />
    )
  })
}

const Home = props => (
  <div>
    {getAllAltCoins()}
  </div>
)

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
