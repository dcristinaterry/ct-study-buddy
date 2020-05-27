import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import Avatar from "../avatar/avatar"

function Profile() {
    const [state] = useStoreContext()
    console.log(state.classes)
    return (
        <div className="col-sm-2">
            <div className="row">
                <Avatar />
            </div>
            <div className="row">
                {state.classes.map((item, index) => (
                    
                    <div key={item.id}>
                    <button className="btn btn-light ml-3 border-dark" 
                    // onClick={() => AllSessions(state.classid)}
                    >
                        {item.Class.subject}
                    </button>
                    </div>
                ))}
                
                {/* <button className="btn btn-light ml-3 border-dark" onClick={props.class2}>
                    Class 2
                </button>
                <br />
                <button className="btn btn-light ml-3 border-dark" onClick={props.class3}>
                    Class 3
                </button>
                <br />
                <button className="btn btn-light ml-3 border-dark" onClick={props.class4}>
                    Class 4
                </button> */}
            </div>
        </div>
    )
}

export default Profile