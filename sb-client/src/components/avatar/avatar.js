// image field from authenticated user
import React from "react";
import { useStoreContext } from "../../utils/GlobalState"
import "./avatar.css"

function Avatar(props) {
    const [state] = useStoreContext()
    return (
        <div className="">
            <img className="h-64 w-64 object-cover object-center" src={state.currentUser.image} alt="..." />
        </div>
    )
}
export default Avatar