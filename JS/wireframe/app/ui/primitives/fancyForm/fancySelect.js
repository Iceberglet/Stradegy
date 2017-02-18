import React from 'react'
import ReactDOM from 'react-dom'
import { filter } from './filtering'

export const FancySelect = React.createClass({
  propTypes: {
    itemHeight: React.PropTypes.number,
    label: React.PropTypes.string,
    values: React.PropTypes.array,  //list of string
    valueKey: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,  //One of strings
    onConfirmChange: React.PropTypes.func, //takes {this.props.key: this.props.value} as input. Used to change upon udpate of values
    invalidProtocol: React.PropTypes.oneOf(['keep', 'discard', 'empty']),
    readonly: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    itemRender: React.PropTypes.func  //To Render Individual Items
  },

  getDefaultProps(){
    return {
      itemHeight: 30,
      invalidProtocol: 'discard'
    }
  },

  getInitialState(){
    return this.getStatesFromProps(this.props)
  },

  componentWillReceiveProps(nextProps){
    this.setState(this.getStatesFromProps(nextProps))
  },

  getStatesFromProps(props){
    let arr = props.values.slice()
    if(this.input){
      this.input.value = props.value || ''
    }
    return {
      value: props.value,
      selectableValues: arr,  //shallow copies the array
      highLightValue: 0
    }
  },

  onChange(v){
    this.setState({
      value: v
    }, ()=>{
      this.props.onConfirmChange && this.props.onConfirmChange(this.getObj(this.props.valueKey, this.state.value))
    })
  },

  onFocus(){
    this.setState({
      selected: true
    })
  },

  onBlur(){
    let v = this.props.values.find(o=>this.input.value===o) || this.onInvalidValue()
    let token = v === undefined? '' : v
    this.setState({
      value: v,
      selected: false,
      selectableValues: filter(this.props.values, token)
    }, ()=>{
      this.props.onConfirmChange && this.props.onConfirmChange(this.getObj(this.props.valueKey, this.state.value))
      this.input.value = token
    })
  },

  //To Set Focus on Input
  onClickLabel(){
    this.input.focus()
  },

  //Filter available options
  onChangeInput(v){
    let token = v
    let res = filter(this.props.values, token)

    this.setState({
      selectableValues: res,
      highLightValue: 0
    })
  },

  //Up and Down and Enter
  onKeyDown(e){
    if(!e.keyCode){
      return
    }
    if(e.keyCode === 38 && this.state.selectableValues.length !== 0){
      //Up Arrow
      this.setState({
        highLightValue: Math.max(0, this.state.highLightValue - 1)
      }, ()=>{
        this.input.value = this.state.selectableValues[this.state.highLightValue]
        this.scrollToHighlighted()
      })
      e.preventDefault()
    } else if (e.keyCode === 40 && this.state.selectableValues.length !== 0){
      //Down Arrow
      this.setState({
        highLightValue: Math.min(this.state.selectableValues.length - 1, this.state.highLightValue + 1)
      }, ()=>{
        this.input.value = this.state.selectableValues[this.state.highLightValue]
        this.scrollToHighlighted()
      })
      e.preventDefault()
    } else if (e.keyCode === 13){
      //Enter
      let value
      if(this.state.selectableValues.length === 0){
        value = this.onInvalidValue()
      } else {
        value = this.state.selectableValues[this.state.highLightValue]
      }

      this.setState({
        value,
        selected: false
      }, ()=>{
        this.input.blur()
        this.input.value = value
      })
    }
  },

  scrollToHighlighted(){
    let el = ReactDOM.findDOMNode(this.menu);
    //Height to top
    let menuHeight = el.offsetHeight;
    let targetHeight = this.state.highLightValue * this.props.itemHeight
    if(targetHeight + this.props.itemHeight > menuHeight + el.scrollTop){
      el.scrollTop = targetHeight - menuHeight + this.props.itemHeight
    }
    else if(targetHeight < el.scrollTop){
      el.scrollTop = targetHeight
    }
    // let divHeight = Math.min(el.offsetHeight, this.state.selectableValues.length * this.props.itemHeight || 0)
  },

  //Returns the desired {key: XXX, value: XXX} after invalid processing
  onInvalidValue(){
    switch(this.props.invalidProtocol){
      case 'keep': return {key: this.input.value, label: this.input.value}
      case 'discard': return this.state.value
      case 'empty': return {key: this.input.value, label: ''}
    }
    throw Error('Unknown Protocol: ' + this.props.invalidProtocol)
  },

  getObj(k, v){
    let obj = {}
    v = v===undefined? '' : v
    obj[k] = v
    return obj
  },

  //on select a value
  onSelectItem(v){
    this.setState({
      value: v,
      selected: false
    }, ()=>{
      this.input.value = v
    })
  },

  onHoverItem(keyLabel){
    this.setState({
      highLightValue: this.state.selectableValues.indexOf(keyLabel)
    })
  },

  renderOption(v, idx){
    let className = idx===this.state.highLightValue ? 'fancy-select-item highlight' : 'fancy-select-item'
    return <div className={className}
                style={{height: this.props.itemHeight + 'px', maxHeight: this.props.itemHeight + 'px'}}
                onMouseDown={()=>{this.onSelectItem(v)}}
                onMouseEnter={()=>{this.onHoverItem(v)}}
                key={idx}>{this.props.itemRender? this.props.itemRender(v) : v}
            </div>
  },

  renderNullOption(){
    return <div className='fancy-select-item' style ={{background: 'lightgray'}}>No Matching Result</div>
  },

  render(){
    let activeClass = ( this.state.selected && 'active' )
    let placeHolderClass = 'place-holder ' + (( this.state.value || this.state.selected ) && 'minimal')
    return <div className='fancy' style={{width: '200px'}}>

      <div className={'fancy-select-menu-wrapper ' + activeClass}>
        <div className={'fancy-select-menu ' + activeClass} ref={m=>{this.menu = m}}>
          {this.state.selectableValues && this.state.selectableValues.length > 0 ?
              this.state.selectableValues.map(this.renderOption) : this.renderNullOption()
          }
        </div>
      </div>

      <div style={this.props.labelStyle} className={placeHolderClass} onClick={this.onClickLabel}>{this.props.label}</div>
      <div className={'fancy-input-wrapper'}>
      {
        this.props.readonly?
        <div style={this.props.textStyle} className='fancy-input'>{this.props.value}</div> :
        <input style={this.props.textStyle} className='fancy-input' ref={i=>{this.input=i}} onFocus={this.onFocus} onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown} onChange={(e)=>{this.onChangeInput(e.target.value)}} defaultValue = {this.state.value}/>
      }
        <span className='underline' />
      </div>
      <i className={'fancy-select-arrow fa fa-caret-left fa-lg ' + activeClass}/>
    </div>
  }
})
