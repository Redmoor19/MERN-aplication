import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { CreateCase } from "./pages/CreateCase";

export const useRoutes = (isAuthenticated, userId) => {
  if (isAuthenticated && userId) {
    return (
      <Switch>
        <Route path="/case" exact>
          <CreateCase/>
        </Route>
        <Route path="/profile/:id" children={<ProfilePage />}  exact/>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Redirect to={`/profile/${userId}`} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
