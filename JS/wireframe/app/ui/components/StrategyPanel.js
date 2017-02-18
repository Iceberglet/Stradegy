import React from 'react'
import { Foldable } from 'app/ui/primitives/foldable/Foldable'
import CodeMirror from 'react-codemirror'
import { Transact } from 'app/transaction'
import {FancyInput, FancySelect} from 'app/ui/primitives/fancyForm'
const toSelectObj = (i)=>{return{key: i, label: i}}

const strategyContainerStyle = {
  display: 'flex',
  paddingLeft: '0px',
  overflow: 'hidden',
  paddingTop: '5px',
  paddingBottom: '5px',
  background: '#333333',
  height: '250px'
}

const controllerStyle = {
  flex: 1,
  background: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px'
}

const textareaStyle = {
  flex: 2,
  marginRight: '5px',
  background: '#DDDDDD',
  resize: 'none',
  overflow: 'scroll',
  whiteSpace: 'nowrap'
}

const codeMirrorOption = {
  lineNumbers: 'true',
  mode: 'javascript',
  readOnly: false
}

const fancyInputStyleOverride={
  labelStyle: {
    color: '#adadad'
  },
  textStyle: {
    color: 'white'
  }
}

export const StrategyPanel = React.createClass({
  propTypes: {
    onSave: React.PropTypes.func,
    onApply: React.PropTypes.func,
    code: React.PropTypes.string
  },

  getInitialState(){
    return {
      code: this.props.code,
      strategyList: []
    }
  },

  componentDidMount(){
    this.getStrategies()
  },

  componentWillReceiveProps(props){
    this.onChangeCode(props.code)
  },

  handleTab(e){
    if(e.keyCode === 9){
      let start = e.target.selectionStart, end = e.target.selectionEnd
      e.target.value = e.target.value.substring(0, start)
                       +'    '//+'\t'
                       +e.target.value.substring(end)
      e.target.selectionStart = e.target.selectionEnd = start + 4
      e.preventDefault()
    }
  },

  getStrategies(){
    Transact.readStrategyList((res)=>{
      this.setState({
        strategyList: res.map(toSelectObj)
      })
    })
  },

  onConfirmSelectStrategy(kv){
    Transact.loadStrategy((res)=>{
      this.setState({
        chosenStrategy: kv.chosenStrategy,
        code: res
      })
    }, kv.chosenStrategy.key)
  },

  onUpdate(){
    Transact.createOrUpdateStrategy((res)=>{
      console.log(res)
    }, this.state.chosenStrategy.key, this.state.code)
  },

  onSave(){
    if(this.state.newStrategyName){
      Transact.createOrUpdateStrategy((res)=>{
        console.log(res)
        this.getStrategies()
      }, this.state.newStrategyName, this.state.code)
    } else {
      alert('You Must Choose A Strategy Name First')
    }
  },

  onApply(){
    this.props.onApply && this.props.onApply(this.state.code)
  },

  onChangeCode(newCode){
    this.setState({
      code: newCode
    })
  },

  setStrategyName(name){
    this.setState({
      newStrategyName: name.newStrategyName
    })
  },

  render(){
    return (<div>
      <div style = {strategyContainerStyle}>
        <Foldable label={'Strategies'} >
          <div>Hello</div>
        </Foldable>
        <div style = {controllerStyle}>
          <FancySelect ref={(s)=>{this.strategySelect = s}}
              valueKey={'chosenStrategy'}
              value={this.state.chosenStrategy}
              label={'Chosen Strategy'}
              values={this.state.strategyList}
              onConfirmChange={this.onConfirmSelectStrategy}
              {...fancyInputStyleOverride}/>
          <button className={'base-button'} onClick={this.onUpdate}>Update</button>
          <FancyInput ref={(s)=>{this.strategyInput = s}}
              valueKey={'newStrategyName'}
              value={this.state.newStrategyName}
              label={'New Strategy Name'}
              onConfirmChange={this.setStrategyName}
              {...fancyInputStyleOverride}/>
          <button className={'base-button'} onClick={this.onSave}>Save</button>
          <button className={'base-button'} onClick={this.onApply}>Run</button>
        </div>
        <div style={textareaStyle} >
          <CodeMirror value={this.state.code || ''} onChange={this.onChangeCode} options={codeMirrorOption} />
        </div>
        {/*<textarea ref={a=>{this.input = a}} style={textareaStyle} onKeyDown={this.handleTab}/>*/}

      </div>
    </div>)
  }
})
