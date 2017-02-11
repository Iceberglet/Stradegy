import React from 'react'
import {FancyInput} from './fancyInput'

export const FancyInputNumber = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    valueKey: React.PropTypes.string,
    onConfirmChange: React.PropTypes.func
  },



  validateEvent(evt){
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault){
        theEvent.preventDefault();
      }
    }
  },

  render(){
    return (<FancyInput ref='input' {...this.props} validateEvent={this.validateEvent}/>)
  }
})
