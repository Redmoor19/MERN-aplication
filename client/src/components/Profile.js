import React from "react";

export const Profile = ({ information }) => {
  var avatar
  information.imageName ? avatar = information.imageName : avatar = "Без названия.png"
  
  const year = information.dateOfBirth.split('-')[0]
  const month = information.dateOfBirth.split('-')[1]
  const day = information.dateOfBirth.split('-')[2]
  
  return (
    <div className="row">
    <div className="col s12">
      <div className="card">
        <div className="card-image">
        <img src={require(`../images/${avatar}`)} alt='userImage'/>
          <span className="card-title fat">{information.name} {information.secondName}</span>
        </div>
        <div className="card-content">
          <h5>Date of birth:</h5> 
            <p>{day}-{month}-{year}</p>
          <h5>Adress:</h5>
            <p>{information.address.street}</p>
          <h5>City</h5>
            <p>{information.address.post}, {information.address.city}</p>
          <h5>Contact phone:</h5>
            <p>{information.phone}</p>
        </div>
      </div>
    </div>
  </div>
  );
};
