import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { arrayHandler } from '../functions/array.function';


export const CreateCase = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [form, setForm] = useState({
        id: "",
        doctorId: "",
        doctor: "", 
        disease: "",
        recipe: "",
        information: ""
    });
    
    useEffect(() => {
        const dataHandler = async () => {
          const response = await request(`api/users/`, "GET", null, {
            Authorization: `Bearer ${auth.token} ${auth.userId} ${auth.isWorthy}`
          });
          setData(response);
        };
        dataHandler();
    }, [request, auth.token, auth.isWorthy, auth.userId]);
    
    const array = arrayHandler(data," ");
    const options = array.map( item => {
        const option = {
        id: item.id,
        value: item.info.toLowerCase(),
        label: item.info,
        }
        return option
    })
    
    const handleOption = selectedOption =>{
        setSelectedOption(selectedOption)
        setForm({id : selectedOption.id, doctor:localStorage.getItem('myName'), doctorId: auth.userId})
    }
    
    const changeHandler = event => {
        setForm({...form,[event.target.name] : event.target.value})
    }

    const submitHandler = async () => {
        await request('/api/case/new','POST',{...form},{
            Authorization: `Bearer ${auth.token} ${auth.userId} ${auth.isWorthy}`
        });
    }

    return(
        <div className="row">
            <form className="col s12 create-case">
                <div className="row">
                    <div className="input-field col s6">
                        <Select
                            value={selectedOption}
                            onChange={handleOption}
                            options={options}
                        />
                    </div>
                    <div className="input-field col s6">
                        <input 
                        style={{paddingTop: "19px"}} 
                        id="disease"
                        name="disease" 
                        type="text" 
                        className="validate"
                        value={form.disease}
                        onChange={changeHandler}
                        />
                    <label htmlFor="disease">Disease</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea 
                        id="recipe" 
                        className="materialize-textarea"
                        name="recipe"
                        value={form.recipe}
                        onChange={changeHandler}
                        >
                        </textarea>
                    <label htmlFor="recipe">Prescription</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea 
                        id="information" 
                        className="materialize-textarea"
                        name="information"
                        value={form.information}
                        onChange={changeHandler}
                        >
                        </textarea>
                    <label htmlFor="recipe">Comment</label>
                    </div>
                </div>
                    <button 
                    className="btn waves-effect waves-light"
                    onClick={submitHandler}
                    >
                    Submit
                    </button>
            </form>
        </div>
    )

}