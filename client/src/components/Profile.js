import React from "react";

export const Profile = ({ information }) => {
  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <h1>{information.name}'s user profile</h1>
        <div className="card blue lighten-2">
          <div className="container left-align">
            <h3>
              {information.name} {information.secondName}
            </h3>
            <h3>{information.address.street}</h3>
            <h3>
              {information.address.post} {information.address.city}
            </h3>
            <h3>{information.phone}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
