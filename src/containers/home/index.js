import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import Images from '../../images'
import Coinigy from '../../services/coinigy'
import {
  updateCurrentCoinValue,
} from '../../modules/counter'
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
      <Row className='altCoinName'>
        <div className='altCoinName'>{`${props.coin.name} - ${props.coin.type}`}</div>
      </Row>
      <Row>
        <div className='altCoinCost'>{props[props.coin.type.toLowerCase()] > 0 ? `${props[props.coin.type.toLowerCase()]} / BTC` : 'Loading...'}</div>
      </Row>
    </Col>
  </a>
)

const getAllAltCoins = (props) => {
  return allAltCoins.map((coin) => {
    return (
      <AltCoin key={coin.type} onClick={() => props.changePage(coin.type)} coin={coin} doge={props.doge} ltc={props.ltc} xmr={props.xmr} />
    )
  })
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    Coinigy.startCoinCostWatch(this.props.updateCurrentCoinValue)
  }

  componentWillUnmount() {
    Coinigy.endCoinCostWatch()
  }

  render() {
    return (
      <Grid>
        <Row>
          {getAllAltCoins(this.props)}
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  doge: state.counter.doge,
  ltc: state.counter.ltc,
  xmr: state.counter.xmr,
  isLoadingData: state.counter.isLoadingData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCurrentCoinValue,
  changePage: (coinType) => push(`/coin-details/${coinType}`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
