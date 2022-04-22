import './App.css';
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  useRoutes,
  Outlet,
} from "react-router-dom";
import Layout from './Layout';
import React from 'react';
import Login from './Login/Login'
import AuthRequired from './AuthRequired';

import HomeContainer from './HomeContainer';

const AllRoutes = () => {
  let routes = useRoutes([
  { path: "/", element: (<Login/>) },
  { path: "/loggedIn", element: (<HomeContainer/>) }
  ]);
  return routes;
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Expense Management & Reporting App</h1>
         
      </header>
      
      <BrowserRouter >
      <AllRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;

