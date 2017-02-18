import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts/highstock';
import { setDarkTheme } from './setTheme';

setDarkTheme(Highcharts)
// react handsontable wrapper
export const HighChart=React.createClass({
  displayName: 'HighChart',
  propTypes: {
    options: React.PropTypes.object.isRequired,
    chartType: React.PropTypes.string,
    className: React.PropTypes.string,
    callback: React.PropTypes.func
  },
  getDefaultProps(){
    return {
      chartType: 'chart',
      className: 'fill'
    }
  },
  componentWillReceiveProps(nextProps){
    // if(this.chart && this.chart.update){
    //   this.chart.update(nextProps.options);
    // }
    // let {options, chartType} = {...nextProps}
    // this.reconstructChart(options, chartType)
  },
  shouldComponentUpdate(){
    return false;
  },
  reconstructChart(options, chartType){
    if (!options) {
      throw new Error('Config must be specified for the ' + this.displayName + ' component');
    }
    let chartConfig = options.chart;
    let node = ReactDOM.findDOMNode(this.refs.chartEl)

    if(!chartType || !Highcharts[chartType]){
      throw new Error('HighChart Does Not Contain a type ' + chartType);
    }

    this.chart = Highcharts[chartType]({
      ...options,
      chart: {
        ...chartConfig,
        renderTo: node
      }
    }, this.props.callback);
  },
  componentDidMount(){
    let options = this.props.options, chartType = this.props.chartType
    this.reconstructChart(options, chartType)
  },
  getHighChart(){
    if (!this.chart) {
      throw new Error('getHighChart() should not be called before the component is mounted');
    }
    return this.chart
  },
  render(){
    return <div className={this.props.className} ref='chartEl'/>
  }
});
