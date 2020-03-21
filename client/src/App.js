import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook'
import { Loader } from './components/loader';
import { Navbar } from './components/navbar';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';


function App() {
  const {login, logout, token, userId, ready, worthy} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const isWorthy = !!worthy
  
  if(!ready){
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated, isWorthy}}>
      <Router>
            {isAuthenticated && <Navbar worthy={isWorthy}/>}
            <div className = "container">
              {routes}
            </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
