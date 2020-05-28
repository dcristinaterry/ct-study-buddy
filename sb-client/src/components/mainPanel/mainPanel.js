import React from "react"
import { useStoreContext } from "../../utils/GlobalState"

function Main() {
    const [state] = useStoreContext()
    console.log(state.classes)
    return (
        <div className="col-md-4">

            <HostSessions/>
            <ParticipatingSessions/>
            <SearchedSessions/>
            {/* <div className="row">
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
            </div> */}
        </div>
    )
}

export default Main