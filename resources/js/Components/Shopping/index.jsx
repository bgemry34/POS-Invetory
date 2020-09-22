import React, {useState, useMemo} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { Provider } from 'react-redux'
import { UserContext } from "./Context/UserContext";
import Cart from './Cart/Cart'

const index = () => {

   const [user, setUser] = useState(null);
   const [openLogin, setOpenLogin] = useState(false)
   const value = useMemo(() => ({ 
     user, 
     setUser,
     openLogin, 
     setOpenLogin 
  }), [user, setUser, openLogin, setOpenLogin]);

    return (
      <UserContext.Provider value={value} >
        <Router>
        <div>
        <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
        </Router>
      </UserContext.Provider>
    )
}

export default index
