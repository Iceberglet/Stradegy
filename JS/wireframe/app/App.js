import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import { TopChart, IndicatorPanel } from 'app/ui/components'

export const App = React.createClass({
  getInitialState(){
    return {
      indicators: [
        // {name: 'Floor', params: [100]},
        // {name: 'Ceiling', params: [100]},
        {name: 'EMA', params: [20]}
        // {name: 'EMA', params: [40]},
        // {name: 'EMA', params: [80]},
        // {name: 'EMA', params: [160]}
      ]
    }
  },

  onChangeIndicator(list){
    console.log(list)
    this.setState({
      indicators: list
    })
  },

  render(){
    return (<div>
      <TopChart dataKey='GBPUSD' indicatorConfig={this.state.indicators}/>
      <IndicatorPanel indicatorList={this.state.indicators} onChange={this.onChangeIndicator}/>
    </div>)
  }
})
