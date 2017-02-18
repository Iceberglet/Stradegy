import React from 'react'

export const FancyInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    valueKey: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    validateEvent: React.PropTypes.func,
    readonly: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    onConfirmChange: React.PropTypes.func //Returns {this.props.key: this.props.value}
  },

  getInitialState(){
    return {
      value: this.props.value || ''
    }
  },

  componentWillReceiveProps(nextProps){
    let newValue = nextProps.value || ''
    if(this.input){
      this.input.value = newValue
    }
    if(newValue===''){
      this.setState({
        value: '',
        selected: false
      })
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
      <div style={this.props.labelStyle} className={placeHolderClass} onClick={this.onClickLabel}>{this.props.label}</div>
      <div className={'fancy-input-wrapper'}>
        {
          this.props.readonly?
          <div style={this.props.textStyle} className='fancy-input'>{this.props.value}</div> :
          <input style={this.props.textStyle} className='fancy-input' ref={i=>{this.input=i}} onKeyPress={this.validate} onFocus={this.onFocus}
                  onBlur={this.onBlur} defaultValue = {this.state.value} onChange={this.onChange} />
        }
        <span className='underline' />
      </div>
    </div>
  }
})
