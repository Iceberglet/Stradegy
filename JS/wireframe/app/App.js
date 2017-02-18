import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import 'app/ui/styles/base.css'
import 'app/ui/styles/foldable.css'
import 'app/logic/utility.js'
import 'app/ui/styles/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
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
        {name: 'RSI', params: [14]}
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

  test(strategy){
    let strategyExecutor = new StrategyExecutor(this.getData(), this.getIndicators())
    /*
    if(idx !== 0){
      let opened = portfolio.getOpenPositions()
      if(opened.length === 0){
          tryAndLog(function(){
              let shouldOpenAmount = IND["EMA[60]"][idx-1][1] > IND["EMA[15]"][idx-1][1] && IND["EMA[60]"][idx][1] < IND["EMA[15]"][idx][1] && 1;
              if(shouldOpenAmount){
                portfolio.markOpenPosition(shouldOpenAmount, dayData);
              }})}
          else {tryAndLog(()=>{
              let shouldClose = IND["EMA[60]"][idx][1] > IND["EMA[15]"][idx][1];
                  if(shouldClose){
                      portfolio.markClosePosition(opened[0], dayData);
          }})}
    }
    */

    let res = strategyExecutor.run(strategy)
    this.tc.addOpenLongSeries(res.openLong)
    this.tc.addOpenShortSeries(res.openShort)
    this.tc.addCloseSeries(res.close)
  },

  render(){
    return (<div>

      <div style={{display: 'flex', position: 'relative', overflow: 'hidden'}}>
        <Foldable label={'Indicators'} >
          <IndicatorPanel indicatorList={this.props.indicators} onAdd={this.onAddIndicator} onRemove={this.onRemoveIndicator} />
        </Foldable>
        <div style={{flex: 1, height: '500px'}}>
          <TopChart ref={tc=>{this.tc=tc}} dataKey='USDJPY' indicatorConfig={this.props.indicators}/>
        </div>
      </div>

      <StrategyPanel onApply={this.test}/>
    </div>)
  }
})
