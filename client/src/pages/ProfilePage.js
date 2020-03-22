import React,{useEffect, useState, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/loader'
import { UpdateProfile } from '../components/updateprofile'

export const ProfilePage = () =>{
    const [data,setData] = useState()
    const [ready, setReady] = useState(false)
    const [updater, setUpdater] = useState()
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    
    useEffect( () =>{
        const dataHandler = async () =>{
            if(auth && auth.userId){
                const response = await request(`api/profile/${auth.userId}`,'GET',null,{Authorization: `Bearer ${auth.token}`})
                setData(response)
                setReady(true)
            }
        }
        dataHandler()
    }, [auth.userId, updater,auth,request])
    
    const update = () =>{
        setUpdater(true)
    }
    
    if(!ready){
        return <Loader/>
    }
    if(!data.updated){
        return(
            <UpdateProfile id={auth.userId} token={auth.token} updated={update}/>
        )
    }else{
    return(
        <div className='row'>
            <div className='col s8 offset-s2'>
                <h1>{data.name}'s user profile</h1>
                <div className="card blue lighten-2">
                    <div className="container left-align">
                        <h3 >{data.name} {data.secondName}</h3>
                        <h3>{data.address.street}</h3>
                        <h3>{data.address.post} {data.address.city}</h3>
                        <h3>{data.phone}</h3>
                    </div>
                </div>
            </div>
            
        </div>
    )
    }
}   