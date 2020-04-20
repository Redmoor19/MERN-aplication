import React, { useState, useEffect } from 'react';

export const UpdateProfile = (props) =>{
    const [file, setFile] = useState(null)
    const [form, setForm] = useState({
        updated: false,
        name: '', 
        secondName: '' ,
        street: '',
        post: '',
        city: '',
        phone: '',
        dateOfBirth: ''
    })

    useEffect( () => {
        window.M.updateTextFields()
    },[])

    const changeHandler = (event) =>{
        setForm({...form,[event.target.name] : event.target.value})
        console.log(form)
    }

    const imageUpdate = (event) =>{
        event.preventDefault()
        setFile(event.target.files[0])
    }

    const updateHandler = async () => {
        const data = new FormData();
        data.append('userImage',file);
        data.append('updated', form.updated)
        data.append('name', form.name)
        data.append('secondName', form.secondName)
        data.append('street', form.street)
        data.append('post', form.post)
        data.append('city', form.city)
        data.append('phone', form.phone)
        data.append('dateOfBirth', form.dateOfBirth)
        await fetch(
            `/api/profile/${props.id}`,
            {
                method: 'POST',
                body: data,
                headers: {Authorization: `Bearer ${props.token} ${props.id}`}
            }
        )
        props.updated()
    }

    return(
        <div className='row'>
            <div className='col s8 offset-s2'>
                <div className='card blue lighten-2' style={{marginTop: '50px'}}>
                    <div className='card-content black-text'>
                        <span className='center-align card-title'>Profile update</span>
                        <div>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>File</span>
                                    <input 
                                    type="file"
                                    name="file"
                                    onChange={imageUpdate}
                                    />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>                            
                            <div className="input-field">
                                <input 
                                placeholder="Enter your name" 
                                id="name" 
                                type="text"
                                name="name"
                                className="yellow-input"
                                value={form.name}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter your second name" 
                                id="secondName" 
                                type="text"
                                name="secondName"
                                className="yellow-input"
                                value={form.secondName}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="secondName">Second name</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Pick your date of birth"
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                className="yellow-input"
                                onChange= {changeHandler} 
                                value={form.dateOfBirth}
                                />
                                <label htmlFor="dateOfBirth">Date of birth</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter the street and house number" 
                                id="street" 
                                type="text"
                                name="street"
                                className="yellow-input"
                                value={form.street}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="street">Address</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter your post code" 
                                id="post" 
                                type="text"
                                name="post"
                                className="yellow-input"
                                value={form.post}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="post">Post code</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter the city" 
                                id="city" 
                                type="text"
                                name="city"
                                className="yellow-input"
                                value={form.city}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="city">City</label>
                            </div>
                            <div className="input-field">
                                <input 
                                placeholder="Enter your phone" 
                                id="phone" 
                                type="text"
                                name="phone"
                                className="yellow-input"
                                value={form.phone}
                                onChange = {changeHandler}
                                />
                                <label htmlFor="phone">Phone</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" 
                            onClick={updateHandler}
                            >
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}