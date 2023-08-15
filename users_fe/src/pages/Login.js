import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';



export default function Login(login_data){
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const submitLogin= async (data) => {
      let result = await fetch('http://127.0.0.1:8000/api/login', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
      })
  
      if (result.status === 200) {
        setLoggedIn(true);
      } else {
        toast.error('Failed to log in');
      }
        
    }

    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>Please log in.</Navbar.Brand>
            </Container>
        </Navbar>
        <div className="center">
            <Form onSubmit={e => submitLogin(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                Submit
                </Button>
            </Form>
        </div>
    </div>
    
  )
}