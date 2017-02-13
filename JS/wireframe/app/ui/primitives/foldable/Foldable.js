import React from 'react'

export const Foldable = React.createClass({
  propTypes: {
    floatTo: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    children: React.PropTypes.node,
    label: React.PropTypes.string.isRequired
  },

  getDefaultProps(){
    return {
      floatTo: 'left'
    }
  },

  getInitialState(){
    return {
      folded: true
    }
  },

  getTranslationStyle(){

  },

  toggleFold(folded){
    if(folded===undefined){
      folded = !this.state.folded
    }
    this.setState({folded})
  },

  getIconClass(){
    if(this.props.floatTo==='left' || this.props.floatTo==='right'){
      let res = 'fa icon fa-angle-left'
      if(this.state.folded === (this.props.floatTo==='left')){
        res = 'fa icon fa-angle-right'
      }
      return res
    } else {
      let res = 'fa icon fa-angle-down'
      if(this.state.folded === (this.props.floatTo==='down')){
        res = 'fa icon fa-angle-up'
      }
      return res
    }
  },

  render(){
    let foldClass = ' ' + this.state.folded ? '' : 'unfold'
    return (<div className={'foldable foldable-' + this.props.floatTo + foldClass}>
        <div className='content'>
          {this.props.children}
          <div className='handle'>
            <i className={this.getIconClass()} onClick={()=>this.toggleFold()}/>
            <span className='vertical'>{this.props.label}</span>
          </div>
        </div>
    </div>)
  }
})
