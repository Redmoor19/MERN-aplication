import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import "materialize-css";

function App() {
  const { login, logout, token, userId, ready, worthy } = useAuth();
  const isAuthenticated = !!token;
  const isWorthy = worthy;
  const routes = useRoutes(isAuthenticated, userId);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated, isWorthy }}
    >
      <Router>
        {isAuthenticated && <Navbar access={isWorthy} />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
