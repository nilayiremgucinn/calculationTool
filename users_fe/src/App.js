import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from './pages/Login'
import Admin from './pages/Admin'
import User from './pages/User';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   client.get("/api/app/")
  //   .then(function(res) {
  //     setLoggedIn(true);
  //   })
  //   .catch(function(error) {
  //     setLoggedIn(false);
  //   });
  // }, []);


  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setLoggedIn(false);
    });
  }

  // if (loggedIn) {
  //   return (
  //     <div>
  //       <Navbar bg="dark" variant="dark">
  //         <Container>
  //           <Navbar.Brand>Configuration Page</Navbar.Brand>
  //           <Navbar.Collapse className="justify-content-end">
  //             <Navbar.Text>
  //               <form onSubmit={e => submitLogout(e)}>
  //                 <Button type="submit" variant="light">Log out</Button>
  //               </form>
  //             </Navbar.Text>
  //           </Navbar.Collapse>
  //         </Container>
  //       </Navbar>
  //         <div className="center">
  //           <h2>You're logged in!</h2>
  //         </div>
  //       </div>
  //   );
  // }
  // return (
  //   <div>
  //     <Login True></Login>
  //   </div>
  // );

  return (
    <Router>
        <div className="App">
        <Routes>
                <Route exact path='/' element={< h1>Home</h1>}></Route>
                <Route exact path='/login' element={< Login True />}></Route>
                <Route exact path='/admin' element={< Admin />}></Route>
                <Route exact path='/app' element={< User />}></Route>
        </Routes>
        </div>
    </Router>
);
}

export default App;
