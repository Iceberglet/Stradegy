import React from 'react'
import { Foldable } from 'app/ui/primitives/foldable/Foldable'
import CodeMirror from 'react-codemirror'
import { Transact } from 'app/transaction'

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

const buttonStyle = {
  width: '50%',
  margin: '5px',
  fontSize: '24px'
}

const codeMirrorOption = {
  lineNumbers: 'true',
  mode: 'javascript',
  readOnly: false
}

export const StrategyPanel = React.createClass({
  propTypes: {
    onSave: React.PropTypes.func,
    onApply: React.PropTypes.func,
    code: React.PropTypes.string
  },

  getInitialState(){
    return {
      code: this.props.code
    }
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

  onSave(){
    Transact.loadStrategy(this.state.code)
  },

  onApply(){
    this.props.onApply && this.props.onApply(this.state.code)
  },

  onChangeCode(newCode){
    this.setState({
      code: newCode
    })
  },

  render(){
    return (<div>
      <div style = {strategyContainerStyle}>
        <Foldable label={'Strategies'} >
          <div>Hello</div>
        </Foldable>
        <div style = {controllerStyle}>
          <button style={buttonStyle} onClick={this.onSave}>Save</button>
          <button style={buttonStyle} onClick={this.onApply}>Apply</button>
        </div>
        <div style={textareaStyle} >
          <CodeMirror value={this.state.code || ''} onChange={this.onChangeCode} options={codeMirrorOption} />
        </div>
        {/*<textarea ref={a=>{this.input = a}} style={textareaStyle} onKeyDown={this.handleTab}/>*/}

      </div>
    </div>)
  }
})
