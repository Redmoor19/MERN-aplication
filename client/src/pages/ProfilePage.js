import React,{useEffect, useState, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { UpdateProfile } from '../components/Updateprofile'
import { Profile } from '../components/Profile'

export const ProfilePage = ({id}) =>{
    const [data,setData] = useState()
    const [ready, setReady] = useState(false)
    const [updater, setUpdater] = useState()
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    
    useEffect( () =>{
        const dataHandler = async () =>{
            if(auth && auth.userId){
                const response = await request(`api/profile/${auth.userId}`,'GET',null,{Authorization: `Bearer ${auth.token} ${auth.userId}`})
                setData(response)
                setReady(true)
            }
        }
        dataHandler()
    }, [auth.userId, updater,auth,request])
    
    const update = () =>{
        setUpdater(true)
    }
    
    if (!ready) {
        return <Loader/>
    }else if (!data.updated) {
        return(
            <UpdateProfile id={auth.userId} token={auth.token} updated={update}/>
        )
    }else{
    return(
        <Profile information={data} />
    )
    }
}   