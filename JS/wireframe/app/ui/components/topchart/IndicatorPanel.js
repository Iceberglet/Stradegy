import React from 'react'
import {FancyInput, FancySelect} from 'app/ui/primitives/fancyForm'
import { INDICATORS, IndicatorAPI } from 'app/logic/indicators'
import {getDataKeys} from 'app/data'
const dataKeys = getDataKeys()
const indicatorNames = Object.keys(INDICATORS)

export const IndicatorPanel = React.createClass({
  propTypes: {
    indicatorList: React.PropTypes.array,
    dataKey: React.PropTypes.string,
    onAdd: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onChangeDataKey: React.PropTypes.func.isRequired
  },

  getDefaultProps(){
    return {
      indicatorList: []
    }
  },

  getInitialState(){
    return this.getStateFromProps(this.props)
  },

  getStateFromProps(props){
    return {
      ...props,
      newConfig: {}
    }
  },

  onClickRemove(indicator){
    this.setState((state)=>{
      state.indicatorList.splice(state.indicatorList.findIndex(i=>i===indicator), 1)
      return state
    }, ()=>this.props.onRemove(indicator))
  },

  onChangeNewConfig(obj){
    this.setState({
      newItem: {...this.state.newItem,...obj}
    })
  },

  onClickAdd(){
    let newItem = {name: this.state.newItem.name, params: JSON.parse(this.state.newItem.params)}
    if(this.state.indicatorList.find(i=>IndicatorAPI.equals(i, newItem))){
      console.warn('Adding a duplicate indicator! Ignored!', newItem)
      return
    }
    this.setState((s)=>{
      s.indicatorList.push(newItem)
      s.newItem = {}
      return s
    }, ()=>this.props.onAdd(newItem))
  },

  onChangeDataKey(kv){
    this.setState({
      dataKey: kv.dataKey
    }, ()=>{
      this.props.onChangeDataKey && this.props.onChangeDataKey(kv.dataKey)
    })
  },

  //{name: params: }
  renderItem(indicator){
    return (<div className='fancy-indicator-container' key={indicator.name+JSON.stringify(indicator.params)}>
        <FancySelect label='Name' value={indicator.name} readonly={true} valueKey='name' values={indicatorNames}/>
        <FancyInput label='Params' value={JSON.stringify(indicator.params)} readonly={true} valueKey='params'/>
        <i className='fa fa-times icon icon-adjust' onClick={()=>this.onClickRemove(indicator)}></i>
      </div>)
  },

  render(){
    let newItem = this.state.newItem
    return (<div style={{overflow: 'scroll', height: '100%'}}>
        {<div className='fancy-indicator-container' key='dataKey'>
            <FancySelect label='Financial Product' value={this.state.dataKey} onConfirmChange={this.onChangeDataKey} valueKey='dataKey' values={dataKeys}/>
        </div>}
        {this.state.indicatorList.map(this.renderItem)}
        {<div className='fancy-indicator-container' key='newItem'>
            <FancySelect label='Name' value={newItem && newItem.name} onConfirmChange={this.onChangeNewConfig} valueKey='name' values={indicatorNames}/>
            <FancyInput label='Params' value={newItem && newItem.params} onConfirmChange={this.onChangeNewConfig} valueKey='params'/>
            <i className='fa fa-plus icon icon-adjust' onClick={this.onClickAdd}></i>
          </div>}
      </div>)
  }
})
