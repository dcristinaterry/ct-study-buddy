import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
import LoginUser from "./pages/userPages/LoginUser"
import UserDashboard from "./pages/userPages/UserDashboard"
import AdminDashboard from "./pages/userPages/AdminDashboard"
import { StoreProvider } from "./utils/GlobalState"


function App() {
  return (



    <Router>
      <StoreProvider>
        <div className="App">



          <Switch>

            <Route path="/userDashboard" component={UserDashboard} />
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route exact path="/" component={LoginUser} />
          </Switch>

        </div>

      </StoreProvider>

    </Router>

  );
}

export default App;
