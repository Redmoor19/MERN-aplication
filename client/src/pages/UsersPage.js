import React,{useEffect, useState, useContext} from 'react'
import { User } from '../components/user'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const UsersPage = () =>{
    const {request} = useHttp()
    const [data, setData] = useState([])
    const [search, setSearch] = useState(" ")
    const auth = useContext(AuthContext)
    
    useEffect( () =>{
        const dataHandler = async () =>{
            const response = await request(`api/users/`,'POST',{userId: auth.userId},{Authorization: `Bearer ${auth.token} ${auth.isWorthy}`})
            setData(response)
        }
        dataHandler()
    },[request, auth.token, auth.isWorthy, auth.userId])


    const searchHandler = event =>{
        setSearch(event.target.value)
    }
    
    var array = data.map( item => {
        const user = {
            id: item._id,
            info: item.secondName + " " + item.name
        }
        return user
    })

    array = array.sort(function (a, b) {
        if (a.info < b.info) return -1;
        else if (a.info > b.info) return 1;
        return 0;
    })

    const filterItems = (query) => {
        return array.filter((element) =>
          element.info.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    array = filterItems(search)


    return(
        <div className='container'>
            <div className="row">
                <div className="col s12">
                <div className="row" style={{marginTop: '10px'}}>
                    <div className="input-field col s12">
                    <input 
                    type="text" 
                    id="search" 
                    className="autocomplete"
                    onChange={searchHandler}/>
                    <label htmlFor="search">Search</label>
                    </div>
                </div>
                </div>
            </div>
            {array.map( user =>(
                <User key={user.id} info={user.info} />
            ))}
        </div>
    )
}