// image field from authenticated user
import React from "react";
import { useStoreContext } from "../../utils/GlobalState"
import "./avatar.css"

function Avatar(props) {
    const [state] = useStoreContext()
    return (
        <div className="row pb-3">
            <img className="mx-auto" src={state.currentUser.image} alt="..." />
        </div>
    )
}
export default Avatar