import React from "react";

export const User = ({id, info}) =>{

    return(
        <div style={
            {border: "2px solid  blue",
            margin: "4px",
            paddingLeft: "10px",
            borderRadius: "25px"
            }
            }>
            <h5>{info}</h5>
        </div>
    )
}