import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import Images from '../../images'
// import Coinigy from '../../services/coinigy'
import './style.css'

const allAltCoins = [
  {
    type: 'DOGE',
    name: 'Dogecoin',
  },
  {
    type: 'LTC',
    name: 'Litecoin',
  },
  {
    type: 'XMR',
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
      <AltCoin key={coin.type} onClick={() => props.changePage(coin.type)} coin={coin} />
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
  isLoadingData: state.counter.isLoadingData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (coinType) => push(`/coin-details/${coinType}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
