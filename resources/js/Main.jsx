import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Shopping from './Components/Shopping'
import Inventory from './Components/Inventory/Sidebar/Sidebar'


const Main = () => {
  return (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Shopping} />
        <Route path="/Admin/Inventory" component={Inventory} />
      </Switch>
    </div>
  </Router>
  )
}

export default Main
