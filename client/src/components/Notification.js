import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
    
export const Notification = (props) =>{

    const [notif, setNotif] = useState(props.data.notifications);
    const [show, setShow] = useState(false)    

    useEffect(()=>{},[])


    const deleteHandler = async () =>{
        if(notif){
        await fetch(`/api/case/delete/${props.userId}`,
        {
            method: "DELETE",
            body: null,
            header: null
        });
        }
        setNotif(null);
        console.log('notif')
    }


    return(
        <div>
            <div className="notificationIcon">
            {!notif && <div>
                <img src={require('../images/iconfinder_Plus_206460.png')} 
                alt='icon'
                onClick = {() => {setShow(!show)}}
                ></img>
            </div>}   
            {notif && <div>
                <img src={require('../images/iconfinder_Plus_206460 — копия.png')} 
                alt='icon'
                onClick = {() => {setShow(!show)}}
            ></img>
            </div>}
            </div>
            
        {show && 
        <div className="notification-content">
        {notif && <div>
            {notif.map(item =>(
                <NavLink to={`/profile/${item.to}`}>
                    <p>You have a new {item.type} from {item.from}</p>
                </NavLink>
            ))}
            <button className="btn waves-effect waves-light"  
            name="action"
            onClick={deleteHandler}>Clear notifications
            </button>
        </div>}
            {!notif && <div>
            <p>You have no notifications</p>
            <button className="btn waves-effect waves-light"  
            name="action"
            onClick={deleteHandler}>Clear notifications
            </button>
            </div>}       
        </div>}
        </div>
        )
    
}