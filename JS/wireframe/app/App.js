import React from 'react'
import 'app/ui/styles/fancyForm/index.css'
import { TopChart } from 'app/ui/components'

export const App = React.createClass({
  render(){
    let indicators = [
      {name: 'Floor', params: [100]},
      {name: 'Ceiling', params: [100]}
    ]
    return (<TopChart dataKey='GBPUSD' indicatorConfig={indicators}/>)
  }
})
