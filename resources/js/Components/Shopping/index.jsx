import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'

const index = () => {
    return (
        <Router>
        <div>
        <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    )
}

export default index
