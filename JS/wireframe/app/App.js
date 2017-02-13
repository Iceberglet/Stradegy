import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import { TopChart, IndicatorPanel } from 'app/ui/components'

export const App = React.createClass({
  getDefaultProps(){
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

  // onChangeIndicator(list){
  //   console.log(list)
  //   this.setState({
  //     indicators: list
  //   })
  // },

  onAddIndicator(indicator){
    this.tc && this.tc.addIndicator(indicator)
  },

  onRemoveIndicator(indicator){
    this.tc && this.tc.removeIndicator(indicator)
  },

  render(){
    return (<div>
      <TopChart ref={tc=>{this.tc=tc}} dataKey='GBPUSD' indicatorConfig={this.props.indicators}/>
      <IndicatorPanel indicatorList={this.props.indicators} onAdd={this.onAddIndicator} onRemove={this.onRemoveIndicator} />
    </div>)
  }
})
