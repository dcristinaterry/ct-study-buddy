// image field from authenticated user
import React from "react";
import { useStoreContext } from "../../utils/GlobalState"
import "./avatar.css"

function Avatar(props) {
    const [state] = useStoreContext()
    return (
        <div className="row">
            <div className="col-sm-1">
                <div className="card">
                    <img src={state.currentUser.image} alt="..." />
                </div>
            </div>
        </div>
    )
}
export default Avatar