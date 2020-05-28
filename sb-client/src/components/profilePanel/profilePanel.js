import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import Avatar from "../avatar/avatar"
import API_User from "../../utils/API_User"

const Profile = props => {
    const [state] = useStoreContext()
    
    console.log(state)

    const allClassSessions = () => {
        console.log("button clicked")
        API_User.getAllUserSessions().then(sessionResp => {
            console.log("get allclass allsessions", sessionResp)
        })        
    } 

    return (
        <div className="col-md-12">
            <div className="row">
            <div className="col-md-12">
                <Avatar />
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                {state.classes.map((item, index) => (  
                    <div key={item.id}>
                    <button className="btn btn-light mx-auto mb-3 border-dark" 
                    // onClick={() => AllSessions(state.classid)}
                    >
                        {item.Class.subject} {item.Class.class}
                    </button>
                    </div>
                ))}                    
                    <button className="btn btn-light mx-auto border-dark" onClick={allClassSessions}> 
                    Sessions
                     </button>
            </div>
            </div>
        </div>
    )
}

export default Profile