import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: 'test1@test.com',
        password: 'test11'
      })
    }).then(res => res.json()).then(data => console.log(data)).catch(e => {
      console.log(e.message)
    })
  })

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
}

export default App;
