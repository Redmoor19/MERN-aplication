import React, { useEffect, useState, useContext } from "react";
import { User } from "../components/User";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { arrayHandler } from "../functions/array.function";

export const UsersPage = () => {
  const { request } = useHttp();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(" ");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const dataHandler = async () => {
      const response = await request(`api/users/`, "GET", null, {
        Authorization: `Bearer ${auth.token} ${auth.userId} ${auth.isWorthy}`
      });
      setData(response);
    };
    dataHandler();
  }, [request, auth.token, auth.isWorthy, auth.userId]);

  const searchHandler = event => {
    setSearch(event.target.value);
  };

  const array = arrayHandler(data, search);


  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="row search">
            <div className="input-field col s12">
              <input
                type="text"
                id="search"
                className="autocomplete"
                onChange={searchHandler}
              />
              <label htmlFor="search">Search</label>
            </div>
          </div>
        </div>
      </div>
      {array.map(user => (
        <User key={user.id} id={user.id} info={user.info} dateOfBirth={user.dateOfBirth} />
      ))}
    </div>
  );
};
