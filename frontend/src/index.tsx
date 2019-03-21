import * as React from 'react'
import ReactDOM from 'react-dom'
import moment from "moment";

import Departures from './Departures'

moment.locale('nb')

function App() {
  return (
    <Departures />
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
