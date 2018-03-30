import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
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
  <a onClick={props.onClick} className='altCoinLink'>
    <Col xs={12} sm={4} md={4} lg={4} className='altCoinContainer'>
      <img src={Images[props.coin.type]} className="altCoinLogo"/>
      <Row>
        <div className='altCoinCost'>$750.23</div>
      </Row>
    </Col>
  </a>
)

const getAllAltCoins = (props) => {
  return allAltCoins.map((coin) => {
    return (
      <AltCoin key={coin.type} onClick={() => props.history.push(`/coin-details/${coin.type}`)} coin={coin} />
    )
  })
}

const Home = props => (
  <Grid>
    <Row>
      {getAllAltCoins(props)}
    </Row>
  </Grid>
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
