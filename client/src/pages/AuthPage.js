import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () =>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, loading, error, clearError} = useHttp()
    const [form, setFrom] = useState({
        email: '', password: ''
    })

    const changeHandler = event =>{
        setFrom({...form, [event.target.name] : event.target.value})
    }

    useEffect( () => {
        window.M.updateTextFields()
    },[])

    useEffect( () => {
        message(error)
        clearError()
    },[message, error, clearError])

    const registerHandler = async () => {
        const data = await request('/api/auth/register','POST',{...form})
        message(data.message)
    }

    const loginHandler = async () =>{
        try{
            const data = await request('/api/auth/login',"POST", {...form})
            auth.login(data.token, data.userId, data.worthy)
        }catch (e){}
    }

    return(
        <div className="row">
        <div className="col s6 offset-s3">
            <h1>MedService</h1>
            <div className="card blue darken-1">
                <div className="card-content black-text">
                    <span className="card-title">Registration</span>
                    <div>
                    <div className="input-field">
                        <input 
                        placeholder="Enter email" 
                        id="email" 
                        type="text"
                        name="email"
                        className="yellow-input"
                        value={form.email}
                        onChange = {changeHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input 
                        placeholder="Enter password" 
                        id="password" 
                        type="password"
                        name="password"
                        className="yellow-input"
                        value={form.password}
                        onChange={changeHandler}
                        />
                        <label htmlFor="password">Password</label>
                    </div>  
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4" 
                    style={{marginRight: 10}}
                    onClick={loginHandler}
                    disabled={loading}
                    >
                        Enter
                    </button>

                    <button className="btn grey lighten-1 black-text"
                    onClick = {registerHandler}
                    disabled={loading}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}