import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactChartJS from 'react-chartjs'
import Images from '../../images'
import {
  updateHistoricData,
} from '../../modules/cointracker'
import './style.css'

const LineChart = ReactChartJS.Line

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
    }, 10000)
  }

  componentWillUnmount() {
    if (this.historicDataUpdateInterval) {
      clearInterval(this.historicDataUpdateInterval)
      this.historicDataUpdateInterval = null
    }
  }

  getFormattedDate (dateInUnix) {
    const coinDate = new Date(dateInUnix * 1000)
    return `${coinDate.getHours()}:${coinDate.getMinutes() < 10 ? '0' : ''}${coinDate.getMinutes()}`
  }

  renderHistoricalData() {
    return this.props.coinHistoricalData.map((coinData, index) => {
      return (
        <Row className={index % 2 === 0 ? 'evenRow' : 'oddRow'} key={coinData.time}>
          <Col className='coinDataColLeft' xs={6} sm={6} md={6} lg={6}>
            {this.getFormattedDate(coinData.time)}
          </Col>
          <Col className='coinDataColRight' xs={6} sm={6} md={6} lg={6}>
            {coinData.open}
          </Col>
        </Row>
      )
    })
  }

  renderLineChart() {
    const times = [];
    const coinOpenValues = [];
    this.props.coinHistoricalData.reverse().forEach((coinData) => {
      times.push(this.getFormattedDate(coinData.time))
      coinOpenValues.push(coinData.open)
    })
    const data = {
    	labels: times,
    	datasets: [
    		{
    			label: "My First dataset",
    			fillColor: "rgba(220,220,220,0.2)",
    			strokeColor: "rgba(220,220,220,1)",
    			pointColor: "rgba(220,220,220,1)",
    			pointStrokeColor: "#fff",
    			pointHighlightFill: "#fff",
    			pointHighlightStroke: "rgba(220,220,220,1)",
    			data: coinOpenValues
    		},
    	]
    };
    const chartOptions = {
    	scaleShowGridLines : true,
    	scaleGridLineColor : "rgba(0,0,0,.05)",
    	scaleGridLineWidth : 1,
    	scaleShowHorizontalLines: true,
    	scaleShowVerticalLines: true,
    	bezierCurve : true,
    	bezierCurveTension : 0.4,
    	pointDot : true,
    	pointDotRadius : 4,
    	pointDotStrokeWidth : 1,
    	pointHitDetectionRadius : 2,
    	datasetStroke : true,
    	datasetStrokeWidth : 2,
    	datasetFill : true,
    	offsetGridLines : false
    };
    return (
      <LineChart data={data} options={chartOptions} width="600" height="250"/>
    )
  }

  render() {
    if (this.props.isLoadingData && (!this.props.coinHistoricalData || !this.props.coinHistoricalData.length)) {
      return (<div>Loading...</div>)
    } else if (this.props.errorMessage) {
      return (<div>{`Error: ${this.props.errorMessage}`}</div>)
    } else {
      return (
        <Grid className='altCoinDetailsContainer'>
          <Row className='altCoinContainer'>
            <img alt={this.props.match.params.coinType} src={Images[this.props.match.params.coinType]} className="altCoinLogo"/>
          </Row>
          <Row className='altCoinCostChart'>
            {this.renderLineChart()}
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
  coinHistoricalData: state.cointracker.coinHistoricalData,
  isLoadingData: state.cointracker.isLoadingData,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateHistoricData,
  changePage: () => push(`/`)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinDetails)
