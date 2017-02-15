import React from 'react'

const strategyContainerStyle = {
  display: 'flex',
  paddingLeft: '5px',
  paddingTop: '5px',
  paddingBottom: '5px',
  background: '#333333',
  height: '250px'
}

const textareaStyle = {
  flex: 1,
  marginRight: '5px',
  background: '#DDDDDD',
  resize: 'none'
}

export const StrategyPanel = React.createClass({
  render(){
    return (<div>
      <div style = {strategyContainerStyle}>
        <textarea style={textareaStyle} />
        <textarea style={textareaStyle} />
        <textarea style={textareaStyle} />
      </div>
    </div>)
  }
})
