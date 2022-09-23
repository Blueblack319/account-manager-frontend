import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { EditProfile } from '../pages/user/edit-profile';

const routes = [{ path: '/edit-profile', component: <EditProfile /> }];

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/">
          {routes.map((route) => (
            <Route path={route.path} element={route.component} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};
