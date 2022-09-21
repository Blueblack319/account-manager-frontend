import React from 'react';
import { LoggedOutRouter } from '../routers/logged-out-router';
import { useAuthState } from '../context/authContext';
import { LoggedInRouter } from '../routers/logged-in-router';

function App() {
  const { isLoggedIn } = useAuthState();
  console.log(isLoggedIn);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
