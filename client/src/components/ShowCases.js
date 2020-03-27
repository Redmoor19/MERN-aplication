import React, {useState, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext' 

export const ShowCases = ({userId, array}) =>{
    return(
    <div className="row" style={{padding: "0 0 0 0",margin: "0 0 0 0" }}>
        <div className="card-pannel amber darken-3">
            <div className = "row " style={{marginLeft: "0px"}}>
                <div className="col s12">
                {array.map(item => 
                (<Post userId={userId} key={item.date} item={item} />)    
                )}
                </div>
            </div>
        </div>
    </div>
    )
}

const Post = ({userId,item}) =>{
    const auth = useContext(AuthContext);
    const {request} = useHttp()
    const [form, setForm] = useState({
        userId: userId,
        postId: item._id,
        person: localStorage.getItem('myName'),
        content:" "
    })

    const changeHandler = event =>{
        setForm({...form, content : event.target.value})
    }
    const submitHandler = async () =>{
        await request('/api/case/add','POST',{...form},{Authorization: `Bearer ${auth.token} ${auth.userId}`})
    }
    return(
        <div style={{paddingBottom: '10px', marginLeft: "0px", border:'2px solid blue'}}>
            <div className = "col s6">
                <h5>{item.doctor}</h5>
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
                <h6>Additional information: {item.information} </h6>
            </div>
            <div>
                {item.comments.map( comment =>
                    (<div key = {comment.id}>
                        <p>{comment.person}: {comment.content}</p>
                    </div>)
                )}
            </div>
            <div>
                <form>
                    <textarea name='comment' cols="30" rows="5" 
                    style={{marginLeft: "10px", resize: "none", background: "white", height:"8vh", width: "350px"}}
                    id="content"
                    value={form.content}
                    onChange={changeHandler}
                    ></textarea>
                    <button className="btn waves-effect waves-light" type="submit" name="action"
                    style={{marginBottom: " 20px", marginLeft: '10px'}}
                    onClick={submitHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}