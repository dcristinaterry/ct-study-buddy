import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import Avatar from "../avatar/avatar"

const Profile = props => {
    const [state] = useStoreContext()
    console.log(state)
    const findAllSessionsAllClasses = () => {
        //api call
        //
    } 
    return (
        <div className="col-md-2">
            <div className="row">
                <Avatar />
            </div>
            <div className="row">
                {state.classes.map((item, index) => (  
                    <div key={item.id}>
                    <button className="btn btn-light ml-3 border-dark" 
                    // onClick={() => AllSessions(state.classid)}
                    >
                        {item.Class.subject} {item.Class.class}
                    </button>
                    
                    {/* <button className="btn btn-light ml-3 border-dark" onClick={findAllSessionsAllClasses}> */}

                    {/* </button> */}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile