import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { UpdateProfile } from "../components/Updateprofile";
import { Profile } from "../components/Profile";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const [data, setData] = useState();
  const [ready, setReady] = useState(false);
  const [updater, setUpdater] = useState();
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const {id} = useParams();
  console.log(id)

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
    id && auth.userId !== id && auth.isWorthy === true
      ? dataHandler(id)
      : dataHandler(auth.userId);
  }, [auth.userId, updater, auth, request, id]);

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
    return <Profile information={data} />;
  }
};
