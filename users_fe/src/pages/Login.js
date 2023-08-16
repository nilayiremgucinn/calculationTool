import React from 'react';
import { Box, Button, Container, FormControl, Paper, Stack, TextField, Typography } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useState} from 'react';
import { toast} from 'react-toastify';
import { Navigate } from "react-router-dom";



export default function Login(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const submitLogin= async () => {
      let data={
        'email': email,
        'password': password
      }
      // let result = await fetch('http://127.0.0.1:8000/api/login', {
      //   method: "POST",
      //   headers: { 'Content-Type': "application/json" },
      //   body: JSON.stringify(data)
      // })
      setLoggedIn(true);
      // console.log(result);
      // if (result.status === 200) {
      //   setLoggedIn(true);
      // } else {
      //   toast.error('Failed to log in');
      // }
        
    }
    if (loggedIn){
      return <Navigate replace to="/admin" />;
    }else{
      return (
        <Container maxWidth="md" sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 4, md: 20 },
  
      }}
      >
        <Paper elevation={24} sx={{ p: 5, borderRadius: 4 }}>
          <FormControl>
            <Stack spacing={3}>
                <Typography gutterBottom variant="h5" component="div">
                    Admin Configuration Login
                </Typography>
                < Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 2, my: 1 }} />
                    <TextField  value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter email" type='text' variant="standard" />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Lock sx={{ color: 'action.active', mr: 2, my: 1 }} />
                    <TextField  onChange={(e) => setPassword(e.target.value)} value={password} label="Password" type='password' variant="standard" />
                </Box>
                <Button variant="primary" onClick={submitLogin}>Login</Button>
            </Stack>
          </FormControl>
        </Paper>
      </Container> 
    )
  }
}