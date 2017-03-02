import React from 'react'
import moment from 'moment'
import { HighChart } from 'chart'

const displayItems = {
  numberOfTrades: 'Number Of Trades',
  winningProbability: 'Winning Trades%',
  longestWin: 'Win Streak',
  longestLose: 'Lose Streak',
  averagePnL: 'Average PnL',
  totalPositionedDuration: 'Notional Weighted Position Holding Time',
  bestPnL: 'Best PnL',
  worstPnL: 'Worst PnL'
}

export const StrategyResult = React.createClass({
  propTypes: {
    result: React.PropTypes.object
  },

  componentDidUpdate(){
    if(this.chartWrapper && this.props.result && this.props.result.pnlSeries){
      let series = this.chartWrapper.getHighChart().series.find(s=>s.name==='Running PnL')
      series.setData(this.props.result.pnlSeries)
    }
  },

  buildOptions(){
    return {
      rangeSelector: {
            selected: 1
      },
      title: {
        text: 'Running PnL'
      },
      tooltip: {
        formatter: function(){
          return '<b>'+moment(this.x).format('YYYY-MMM-DD')+': </b>' + this.y.toFixed(2)
        }
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'PnL'
        },
        plotLines: [{
          value: this.props.result.averagePnL,
          label: {
            text: 'Average PnL',
            style: {
              color: 'white'
            }
          },
          dashStyle: 'shortdash',
          width: 2,
          color: 'white'
        }]
      },
      series: [{
        type: 'scatter',
        name: 'Running PnL',
        data: this.props.result.pnlSeries || []
      }]
    }
  },

  render(){
    // console.log(this.props.result)
    return (<div className='flex-container' style={{width: '800px', height: '100%', background: '#bfbfbf'}}>
      <div className='flex-item-2' style={{height: '100%'}}>
        {this.props.result && this.props.result.pnlSeries && <HighChart ref={c=>{this.chartWrapper=c}} options={this.buildOptions()}/>}
      </div>
      <div className='flex-item-1'>
        <table><tbody>
          {
            this.props.result && Object.keys(this.props.result)
              .filter(i=>Object.keys(displayItems).indexOf(i)>-1)
              .map((item,i)=>{
                return (<tr key={i}><td>{displayItems[item]}</td><td>{this.props.result[item].toFixed(3)}</td></tr>)
              })
          }
        </tbody></table>
      </div>
    </div>)
  }
})
