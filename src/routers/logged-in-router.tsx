import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyStyles } from '../pages/style/myStyles';
import { EditProfile } from '../pages/user/edit-profile';

const routes = [
  { path: '/', component: <MyStyles /> },
  { path: '/edit-profile', component: <EditProfile /> },
];

export const LoggedInRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} key={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  );
};
