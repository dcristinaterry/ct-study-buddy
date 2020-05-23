import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
import LoginUser from "./pages/userPages/LoginUser";
import classPanel from "./components/classPanel";
import sessionInfo from "./components/sessionInfo"


function App() {
  return (

    <Router>
      <div className="App">

       

        <Switch>
          <Route exact path="/" component={LoginUser}/>
          <Route exact path="/classes" component={classPanel}/>
          <Route exact path="/sessions" component={sessionInfo}/>
        </Switch>



      </div>


    </Router>

  );
}

export default App;
