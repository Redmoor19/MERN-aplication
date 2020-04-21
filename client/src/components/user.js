import React from "react";
import { NavLink } from "react-router-dom";

export const User = ({ id, info, dateOfBirth }) => {
  const year = dateOfBirth.split('-')[0]
  const month = dateOfBirth.split('-')[1]
  const day = dateOfBirth.split('-')[2]
  return (
    <NavLink to={`/profile/${id}`} >
      <div className="user-link">
        <h5>{info}</h5>
        <h5 className="right-unique">{day}-{month}-{year}</h5>
      </div>
    </NavLink>
  );
};
