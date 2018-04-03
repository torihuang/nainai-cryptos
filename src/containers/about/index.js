import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import Images from '../../images'
import {
  updateHistoricData,
} from '../../modules/counter'
import './style.css'

const printProps = function printProps(props) {
  console.log('props', props);
}

class CoinDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.updateHistoricData(this.props.match.params.coinType)
    this.historicDataUpdateInterval = setInterval(() => {
      this.props.updateHistoricData(this.props.match.params.coinType)
    }, 60000)
  }

  componentWillUnmount() {
    if (this.historicDataUpdateInterval) {
      clearInterval(this.historicDataUpdateInterval)
      this.historicDataUpdateInterval = null
    }
  }

  formatDate (dateInUnix) {
    const coinDate = new Date(dateInUnix * 1000)
    return `${coinDate.getHours()}:${coinDate.getMinutes()}`
  }

  renderHistoricalData() {
    return this.props.coinHistoricalData.reverse().map((coinData, index) => {
      return (
        <Row className={index % 2 === 0 ? 'evenRow' : 'oddRow'} key={coinData.time}>
          <Col className='coinDataColLeft' xs={6} sm={6} md={6} lg={6}>
            {this.formatDate(coinData.time)}
          </Col>
          <Col className='coinDataColRight' xs={6} sm={6} md={6} lg={6}>
            {coinData.open}
          </Col>
        </Row>
      )
    })
  }

  render() {
    if (this.props.isLoadingData && (!this.props.coinHistoricalData || !this.props.coinHistoricalData.length)) {
      return (<div>{`Error: ${this.props.errorMessage}`}</div>)
    } else if (this.props.errorMessage) {
      return (<div>{`Error: ${this.props.errorMessage}`}</div>)
    } else {
      return (
        <Grid>
          <Row className='altCoinContainer'>
            <img src={Images[this.props.match.params.coinType]} className="altCoinLogo"/>
          </Row>
          <Row className='altCoinCostTable'>
            <Col xs={2} sm={3} md={4} lg={4} />
            <Col xs={8} sm={6} md={4} lg={4}>
              <Row key='table-header' className='table-header'>
                <Col className='coinDataColLeft' xs={6} sm={6} md={6} lg={6}>
                  TIME
                </Col>
                <Col className='coinDataColRight' xs={6} sm={6} md={6} lg={6}>
                  {`${this.props.match.params.coinType} / BTC`}
                </Col>
              </Row>
              {this.renderHistoricalData()}
            </Col>
            <Col xs={2} sm={3} md={4} lg={4} />
          </Row>
        </Grid>
      )
    }
  }
}

const mapStateToProps = state => ({
  coinHistoricalData: state.counter.coinHistoricalData,
  isLoadingData: state.counter.isLoadingData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateHistoricData,
  changePage: () => push(`/`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetails)
