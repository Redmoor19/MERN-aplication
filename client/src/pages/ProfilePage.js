import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { UpdateProfile } from "../components/Updateprofile";
import { Profile } from "../components/Profile";
import { useParams } from "react-router-dom";
import { ShowCases } from "../components/ShowCases";

export const ProfilePage = () => {
  const [data, setData] = useState();
  const [cases, setCases ] = useState([]);
  const [ready, setReady] = useState(false);
  const [updater, setUpdater] = useState();
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const {id} = useParams();

  useEffect(() => {
    const dataHandler = async identifier => {
      if (auth && auth.userId) {
          const url = `/api/profile/${identifier}`
          const response = await request(
          url,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token} ${auth.userId}` }
        );
        setData(response);
        setReady(true);
      }
    };
    const casesHandler = async identifier =>{
      if(auth && auth.userId) {
        const url="/api/case/"
        const response = await request(
          url,
          "POST",
          {id: identifier},
          { Authorization: `Bearer ${auth.token} ${auth.userId}` }
        )
        setCases(response);
      }
    }

    if(id && auth.userId !== id && auth.isWorthy === true){
      dataHandler(id);
      casesHandler(id);
    }
    else{
      dataHandler(auth.userId);
      casesHandler(auth.userId);
    }    
  }, [auth.userId, updater, auth, request, id]);

  if(data && auth.userId === id){
    const myName = data.secondName +" "+ data.name;
    localStorage.setItem('myName',myName);
  }

  const update = () => {
    setUpdater(true);
  };

  if (!ready) {
    return <Loader />;
  } else if (!data.updated) {
    return (
      <UpdateProfile id={auth.userId} token={auth.token} updated={update} />
    );
  } else {
    return (
    <div className=" " style={{marginLeft: "0px"}}>
      <div className="row">
        <div className="col s6" style={{padding: "0 0 0 0",margin: "0 0 0 0" }}>
        <Profile information={data} />
        </div>
        <div className="col s6" style={{padding: "0 0 0 0",margin: "0 0 0 0" }}>
        <ShowCases userId={id} array={cases} />
        </div>
      </div>
    </div>
    )
  }
};
