import React from "react";

export const Profile = ({ information }) => {
  var avatar
  information.imageName ? avatar = information.imageName : avatar = "Без названия.png"

  return (
    <div className="row" style={{padding: "0 0 0 0",margin: "0 0 0 0" }}>
      <div className="card-pannel yellow">
        <img src={require(`../images/${avatar}`)} alt='userImage' style={{width: "150px"}}/>
        <div className = "row" style={{marginLeft: "0px"}}>
          <div className = "col s6">
            <h5>{information.secondName} {information.name}</h5>
          </div>
          <div className = "col s12">
            <h6>Address: </h6>
          </div>
          <br/>
          <div className="col">
            <span>{information.address.street}</span>
          </div>
          <div className="col">
            <span>{information.address.city}, {information.address.post}</span>
          </div>
          <div className = "col s12">
            <h6>Phone: </h6>
          </div>
          <div className="col">
            <span>{information.phone}</span>
          </div>

        </div>
      </div>
    </div>
  );
};
