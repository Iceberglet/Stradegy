import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import 'app/ui/styles/foldable.css'
import 'app/logic/utility.js'
import { TopChart, IndicatorPanel, StrategyPanel } from 'app/ui/components'
import { Foldable } from 'app/ui/primitives/foldable/Foldable'
import { StrategyExecutor } from 'app/logic/StrategyExecutor'

export const App = React.createClass({
  getDefaultProps(){
    return {
      indicators: [
        // {name: 'Floor', params: [100]},
        // {name: 'Ceiling', params: [100]},
        {name: 'EMA', params: [15]},
        {name: 'EMA', params: [60]}
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
    let longOnlyStrategy = {
      open: 'IND["EMA[60]"][idx-1] > IND["EMA[15]"][idx-1] && IND["EMA[60]"][idx] < IND["EMA[15]"][idx] && 1',
      close: 'IND["EMA[60]"][idx] > IND["EMA[15]"][idx]'
    }

    let openLong = [], openShort = [], close = []
    let cb = (result)=>{
      close.push([result.time2, result.price2])
      if(result.position > 0){//is long
        openLong.push([result.time1, result.price1])
      } else {
        openShort.push([result.time1, result.price1])
      }
    }
    strategyExecutor.run(longOnlyStrategy, cb)
    this.tc.addOpenLongSeries(openLong)
    this.tc.addOpenShortSeries(openShort)
    this.tc.addCloseSeries(close)
  },

  render(){
    return (<div>

      <div style={{display: 'flex', position: 'relative', overflow: 'hidden'}}>
        <Foldable label={'Indicators'} >
          <IndicatorPanel indicatorList={this.props.indicators} onAdd={this.onAddIndicator} onRemove={this.onRemoveIndicator} />
        </Foldable>
        <div style={{flex: 1, height: '700px'}}>
          <TopChart ref={tc=>{this.tc=tc}} dataKey='GBPUSD' indicatorConfig={this.props.indicators}/>
        </div>
      </div>

      <StrategyPanel />

      <div>
        <button onClick={this.test} >Test</button>
      </div>
    </div>)
  }
})
