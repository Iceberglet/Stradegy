import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import 'app/ui/styles/foldable.css'
import 'app/logic/utility.js'
import { TopChart, IndicatorPanel } from 'app/ui/components'
import { Foldable } from 'app/ui/primitives/foldable/Foldable'

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
    return (<div style={{display: 'flex', position: 'relative', overflow: 'hidden'}}>
      <Foldable label={'Indicators'} >
        <IndicatorPanel indicatorList={this.props.indicators} onAdd={this.onAddIndicator} onRemove={this.onRemoveIndicator} />
      </Foldable>
      <div style={{flex: 1}}>
        <TopChart ref={tc=>{this.tc=tc}} dataKey='GBPUSD' indicatorConfig={this.props.indicators}/>
      </div>
    </div>)
  }
})
