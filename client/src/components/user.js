import React from "react";
import { NavLink } from "react-router-dom";

export const User = ({ id, info }) => {
  return (
    <NavLink to={`/profile/${id}`} >
      <div
        style={{
          border: "2px solid  blue",
          margin: "4px",
          paddingLeft: "10px",
          borderRadius: "25px"
        }}
      >
        <h5>{info}</h5>
      </div>
    </NavLink>
  );
};
