import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import 'app/ui/styles/foldable.css'
import 'app/logic/utility.js'
import { TopChart, IndicatorPanel } from 'app/ui/components'
import { Foldable } from 'app/ui/primitives/foldable/Foldable'
import { StrategyExecutor } from 'app/logic/StrategyExecutor'

export const App = React.createClass({
  getDefaultProps(){
    return {
      indicators: [
        // {name: 'Floor', params: [100]},
        // {name: 'Ceiling', params: [100]},
        {name: 'EMA', params: [20]},
        {name: 'EMA', params: [40]}
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

  getData(){
    return this.tc.candleChart.chartWrapper.getHighChart().series
      .find(s=>s.userOptions.metaType==='data')
      .options.data
  },

  getIndicators(){
    return this.tc.candleChart.chartWrapper.getHighChart().series
      .filter(s=>s.userOptions.metaType==='indicator')
      .toObject((s)=>s.name, (s)=>s.options.data)
  },

  test(){
    let strategyExecutor = new StrategyExecutor(this.getData(), this.getIndicators())
    console.log(strategyExecutor)
    let strategy = {
      open: 'EMA[20][idx] > EMA[50][idx] && EMA[]',
      openAmount: '1',
      close: ''
    }
    strategyExecutor.run()
  },

  render(){
    return (<div>

      <div style={{display: 'flex', position: 'relative', overflow: 'hidden'}}>
        <Foldable label={'Indicators'} >
          <IndicatorPanel indicatorList={this.props.indicators} onAdd={this.onAddIndicator} onRemove={this.onRemoveIndicator} />
        </Foldable>
        <div style={{flex: 1, height: '500px'}}>
          <TopChart ref={tc=>{this.tc=tc}} dataKey='GBPUSD' indicatorConfig={this.props.indicators}/>
        </div>
      </div>

      <div>
        <button onClick={this.test} >Test</button>
      </div>
    </div>)
  }
})
