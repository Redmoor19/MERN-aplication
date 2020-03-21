import React,{useEffect, useState, useContext} from 'react'
import { User } from '../components/user'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const UsersPage = () =>{
    const {request} = useHttp()
    const [data, setData] = useState([])
    const auth = useContext(AuthContext)
    
    useEffect( () =>{
        const dataHandler = async () =>{
            const response = await request(`api/users/`,'GET',null,{Authorization: `Bearer ${auth.token}`})
            setData(response)
        }
        dataHandler()
    },[request, auth.token])
    
    

    return(
        <div>
            {data.map( user =>(
                <User key={user.name} name={user.name} secondName={user.secondName} />
            ))}
        </div>
    )
}