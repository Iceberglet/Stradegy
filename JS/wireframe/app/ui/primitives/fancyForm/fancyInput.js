import React from 'react'

export const FancyInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    valueKey: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    validateEvent: React.PropTypes.func,
    onConfirmChange: React.PropTypes.func //Returns {this.props.key: this.props.value}
  },

  getInitialState(){
    return {
      value: this.props.value || ''
    }
  },

  componentWillReceiveProps(nextProps){
    if(this.input){
      this.input.value = nextProps.value || ''
    }
  },

  onChange(e){
    this.setState({
      value: e.target.value
    }, ()=>{
      let obj = {}
      obj[this.props.valueKey] = this.state.value
      this.props.onConfirmChange && this.props.onConfirmChange(obj)
    })
  },

  onFocus(){
    this.setState({
      selected: true
    })
  },

  onBlur(){
    this.setState({
      selected: false
    })
  },

  validate(evt){
    if(this.props.validateEvent){
      this.props.validateEvent(evt);
    }
  },

  //To Set Focus on Input
  onClickLabel(){
    this.input.focus()
  },

  render(){
    let placeHolderClass = 'place-holder ' + (( this.state.value || this.state.selected ) && 'minimal')
    return <div className='fancy' style={{width: '200px'}}>
      <div className={placeHolderClass} onClick={this.onClickLabel}>{this.props.label}</div>
      <div className={'fancy-input-wrapper'}>
        <input className='fancy-input' ref={i=>{this.input=i}} onKeyPress={this.validate} onFocus={this.onFocus}
                onBlur={this.onBlur} defaultValue = {this.state.value} onChange={this.onChange}/>
        <span className='underline' />
      </div>
    </div>
  }
})
