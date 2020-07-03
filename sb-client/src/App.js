import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";
// import './App.css';
import LoginUser from "./pages/userPages/LoginUser"
import UserDashboard from "./pages/userPages/UserDashboard"
import AdminDashboard from "./pages/adminPages/AdminDashboard"
import { StoreProvider } from "./utils/GlobalState"
import Style1 from  "./pages/userPages/styleLogin/loginStyle.css"



function App() {
  return (
    <Router>
      <StoreProvider>
        <div className="App">
          <Switch>
            {/* <NavLink to="/userDashboard" activeStyle={{backgroundColor: 'white'}} ></NavLink> */}
            <Route path="/userDashboard" component={UserDashboard} />
         
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route exact path="/" exact component={LoginUser} />
          </Switch>
        </div>
      </StoreProvider>
    </Router>

  );
}

export default App;
