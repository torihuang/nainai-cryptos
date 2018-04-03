import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactChartJS from 'react-chartjs'
import Images from '../../images'
import {
  updateHistoricData,
} from '../../modules/counter'
import './style.css'

const LineChart = ReactChartJS.Line

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

  getFormattedDate (dateInUnix) {
    const coinDate = new Date(dateInUnix * 1000)
    return `${coinDate.getHours()}:${coinDate.getMinutes() < 10 ? '0' : ''}${coinDate.getMinutes()}`
  }

  renderHistoricalData() {
    return this.props.coinHistoricalData.reverse().map((coinData, index) => {
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
    	///Boolean - Whether grid lines are shown across the chart
    	scaleShowGridLines : true,
    	//String - Colour of the grid lines
    	scaleGridLineColor : "rgba(0,0,0,.05)",
    	//Number - Width of the grid lines
    	scaleGridLineWidth : 1,
    	//Boolean - Whether to show horizontal lines (except X axis)
    	scaleShowHorizontalLines: true,
    	//Boolean - Whether to show vertical lines (except Y axis)
    	scaleShowVerticalLines: true,
    	//Boolean - Whether the line is curved between points
    	bezierCurve : true,
    	//Number - Tension of the bezier curve between points
    	bezierCurveTension : 0.4,
    	//Boolean - Whether to show a dot for each point
    	pointDot : true,
    	//Number - Radius of each point dot in pixels
    	pointDotRadius : 4,
    	//Number - Pixel width of point dot stroke
    	pointDotStrokeWidth : 1,
    	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    	pointHitDetectionRadius : 2,
    	//Boolean - Whether to show a stroke for datasets
    	datasetStroke : true,
    	//Number - Pixel width of dataset stroke
    	datasetStrokeWidth : 2,
    	//Boolean - Whether to fill the dataset with a colour
    	datasetFill : true,
    	//Boolean - Whether to horizontally center the label and point dot inside the grid
    	offsetGridLines : false
    };
    return (
      <LineChart data={data} options={chartOptions} width="600" height="250"/>
    )
  }

  render() {
    if (this.props.isLoadingData && (!this.props.coinHistoricalData || !this.props.coinHistoricalData.length)) {
      return (<div>{`Error: ${this.props.errorMessage}`}</div>)
    } else if (this.props.errorMessage) {
      return (<div>{`Error: ${this.props.errorMessage}`}</div>)
    } else {
      return (
        <Grid className='altCoinDetailsContainer'>
          <Row className='altCoinContainer'>
            <img src={Images[this.props.match.params.coinType]} className="altCoinLogo"/>
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
