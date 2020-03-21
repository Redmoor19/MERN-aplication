import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/ProfilePage'
import { UsersPage } from './pages/UsersPage'

export const useRoutes = (isAuthenticated) =>{
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/users" exact>
                    <UsersPage />
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}