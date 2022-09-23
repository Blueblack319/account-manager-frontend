import React from 'react';
import { Signin } from '../pages/signin';
import { CreateAccount } from '../pages/create-account';
import { NotFound } from '../pages/404';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Signin />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
