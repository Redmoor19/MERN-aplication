import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext' 
import { formDate } from '../functions/date'

export const ShowCases = ({userId, array}) =>{
    
    array = array.sort(function(a, b) {
        var date = (x) =>{
            const day = new Date(x)
            const now = new Date(Date.now())
            const dif = Math.abs(day - now)
            return dif
        }
        
        if (date(a.date) < date(b.date)) return -1;
        else if (date(a.date) > date(b.date)) return 1;
        return 0;
    });

    return(
    <div className="row">
        <div className="col s12">
            {array.map(item => 
            (<Post userId={userId} key={item.date} item={item}/>)    
            )}
        </div>
    </div>   
    )
}

const Post = ({userId,item, post}) =>{
    const auth = useContext(AuthContext);
    const [file, setFile] = useState()
    const [form, setForm] = useState({
        senderId: auth.userId,
        userId: userId,
        postId: item._id,
        person: localStorage.getItem('myName'),
        content: ""
    })

    const fullDate = formDate(item.date)

    const changeHandler = event =>{
        setForm({...form, content : event.target.value})
    }
    const fileHandler = event => {
        event.preventDefault()
        setFile(event.target.files[0])
    }
    const submitHandler = async () =>{
        
        const data = new FormData();
        if (file) data.append('file', file)
        data.append('postId', form.postId)
        data.append('userId', form.userId)
        data.append('person', form.person)
        data.append('content', form.content)
        data.append('senderId', form.senderId)

        if (data) await fetch(
            '/api/case/upload',
            {
            method: 'POST',
            body: data,
            headers: {Authorization: `Bearer ${auth.token} ${auth.userId}`}
            }
        )
    }
    return(
        <div className="row">
            <div className="col s12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title case">Disease: {item.disease}</span>
                    <h5>{fullDate.hours}:{fullDate.minutes} {fullDate.day} {fullDate.month} {fullDate.year}</h5>
                    <h5>Recipe: </h5>
                        <p>{item.recipe}</p>
                    <h5>Comment: </h5>
                        <p>{item.information}</p>
                    </div>
                    <div className="card-action">
                        <ul>
                        {item.comments.map( comment =>
                        (<li className="comment" key = {comment.id}>
                            <p>{comment.person}: {comment.content}<br/></p>
                            <a href={`../files/${comment.filename}`} download>{comment.filename}</a>
                        </li>)
                        )}
                        </ul>
                        <form className="comment-form">
                            <textarea name='comment' cols="30" rows="5" 
                            id="content"
                            value={form.content}
                            onChange={changeHandler}
                            >
                            </textarea>
                            <input
                            type='file'
                            name="file"
                            onChange={fileHandler}
                            />
                            <button className="btn waves-effect waves-light" type="submit" name="action"
                            onClick={submitHandler}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}