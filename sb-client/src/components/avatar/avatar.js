// image field from authenticated user
import React from "react";
import "./avatar.css"

function Avatar(props) {
    return (
        <div className="row">
            <div className="col-sm-1">
                <div className="card">
                    <img src={props.image} alt="..." />
                </div>
            </div>
        </div>
    )
}
export default Avatar


