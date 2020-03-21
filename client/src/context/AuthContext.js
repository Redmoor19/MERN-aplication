import {createContext} from 'react'

function useless() {}

export const AuthContext = createContext({
    token: null, 
    userId: null,
    login: useless,
    logout: useless,
    isAuthenticated: false,
    isWorthy: false
})