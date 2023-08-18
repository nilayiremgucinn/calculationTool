import './App.css';
import React from 'react';
import axios from 'axios';
import Login from './pages/Login'
import Admin from './pages/Admin'
import User from './pages/User';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


function App() {

  return (
    <Router>
        <div className="App">
        <Routes>
                <Route exact path='/' element={<h1>Please login or go to app</h1>}></Route>
                <Route exact path='/login' element={< Login True />}></Route>
                <Route exact path='/admin' element={< Admin />}></Route>
                <Route exact path='/app' element={< User />}></Route>
        </Routes>
        </div>
    </Router>
);
}

export default App;
