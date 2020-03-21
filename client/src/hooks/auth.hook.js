import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () =>{
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)
    const [worthy, setWorthy] = useState(null)

    const login = useCallback( (jwtToken, id, access) => {
        setToken(jwtToken)
        setUserId(id)
        setWorthy(access)
        

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id,
            worthy: access
        }))
    }, [])

    const logout = useCallback( ( ) => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect( () =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId, data.worthy)
        }
        setReady(true)
    },[login])
    
    return {token, userId, login, logout, ready, worthy}

}