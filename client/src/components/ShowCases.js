import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from './Loader'

export const ShowCases = ({array}) =>{
    
    return(
    <div className="row" style={{padding: "0 0 0 0",margin: "0 0 0 0" }}>
        <div className="card-pannel amber darken-3">
            <div className = "row " style={{marginLeft: "0px"}}>
                <div className="col s12">
                {array.map(item => 
                (<Post key={item.id} item={item} />)    
                )}
                </div>
            </div>
        </div>
    </div>
    )
}

const Post = ({key,item}) =>{
    const {request} = useHttp()
    const [doctor, setDoctor] = useState({})
    
    useEffect( () => {
        const doctorHandler = async id => {
            if (item) {
                const response = await request(`/api/users/${id}`);
              setDoctor(response);
            }
        };
        doctorHandler(item.doctor)
    },[item, request])
    
    return(
        <div style={{marginBottom: '10px'}}>
            <div className = "col s6">
                <h5>{doctor.secondName} {doctor.name}</h5>
            </div>
            <div className = "col s12">
                <h6>Disease: {item.disease} </h6>
            </div>
            <br/>
            <div className = "col s12">
                <h6>Recipe: {item.recipe} </h6>
            </div>
            <br/>
            <div className = "col s12">
                <h6>Comments: {item.information} </h6>
            </div>
        </div>
    )
}