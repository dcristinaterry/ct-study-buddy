import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import './App.css';
import LoginUser from "./pages/userPages/LoginUser"
import { Router } from express

function App() {
  return (
    <Router>

    <div className="App">
      <LoginUser/>
    </div>
    </Router>
  );
}

export default App;
