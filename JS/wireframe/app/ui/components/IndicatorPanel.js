import React from 'react'
import {FancyInput, FancySelect} from 'app/ui/primitives/fancyForm'

import * as INDICATOR from 'app/logic/indicators'
const toSelectObj = (i)=>{return{key: i, label: i}}
const indicators = Object.keys(INDICATOR).map(toSelectObj)

export const IndicatorPanel = React.createClass({
  propTypes: {
    indicatorList: React.PropTypes.array,
    onChange: React.PropTypes.func
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

  onChange(){
    this.props.onChange && this.props.onChange(this.state.indicatorList)
  },

  onClickRemove(indicator){
    this.setState((state)=>{
      state.indicatorList.splice(state.indicatorList.findIndex(i=>i===indicator), 1)
      return state
    }, this.onChange)
  },

  onChangeNewConfig(obj){
    this.setState({
      newItem: {...this.state.newItem,...obj}
    })
  },

  onClickAdd(){
    this.setState((s)=>{
      s.newItem.params = JSON.parse(s.newItem.params)
      s.newItem.name = s.newItem.name.key
      s.indicatorList.push(s.newItem)
      s.newItem = {}
      return s
    }, this.onChange)
  },

  //{name: params: }
  renderItem(indicator){
    return (<div className='fancy-indicator-container' key={indicator.name+JSON.stringify(indicator.params)}>
        <FancySelect label='Name' value={toSelectObj(indicator.name)} readonly={true} valueKey='name' values={indicators}/>
        <FancyInput label='Params' value={JSON.stringify(indicator.params)} readonly={true} valueKey='params'/>
        <i className='fa fa-times icon' onClick={()=>this.onClickRemove(indicator)}></i>
      </div>)
  },

  render(){
    let newItem = this.state.newItem
    return (<div>
        {this.state.indicatorList.map(this.renderItem)}
        {<div className='fancy-indicator-container' key='newItem'>
            <FancySelect label='Name' value={newItem && newItem.name} onConfirmChange={this.onChangeNewConfig} valueKey='name' values={indicators}/>
            <FancyInput label='Params' value={newItem && newItem.params} onConfirmChange={this.onChangeNewConfig} valueKey='params'/>
            <i className='fa fa-plus icon' onClick={this.onClickAdd}></i>
          </div>}
      </div>)
  }
})
