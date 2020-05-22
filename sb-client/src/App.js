import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import './App.css';
import LoginUser from "./pages/userPages/LoginUser"


function App() {
  return (

    <Router>
      <div className="App">

       

        <Switch>
        <Route exact path="/"  component={LoginUser}/>


        </Switch>



      </div>


    </Router>

  );
}

export default App;
