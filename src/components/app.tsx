import React, { useState, useEffect } from 'react';
import { LoggedOutRouter } from '../routers/logged-out-router';

function App() {
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: 'test1@test.com',
  //       password: 'test11',
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // });

  return <LoggedOutRouter />;
}

export default App;
