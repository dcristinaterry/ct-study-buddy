import React from "react"
import { useStoreContext } from "../../utils/GlobalState"

function SearchedSessions() {
    const [state] = useStoreContext()
    console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
            {state.sessions.map((item, index) => (  
                    <div key={item.id}>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default SearchedSessions