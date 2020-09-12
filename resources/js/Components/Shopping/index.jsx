import React, {useState, useMemo} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { Provider } from 'react-redux'
import { UserContext } from "./Context/UserContext";

const index = () => {

   const [user, setUser] = useState(null);
   const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
      <UserContext.Provider value={value} >
        <Router>
        <div>
        <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
        </Router>
      </UserContext.Provider>
    )
}

export default index
