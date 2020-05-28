import React from "react"
import { useStoreContext } from "../../utils/GlobalState"

function SearchedSessions() {
    const [state] = useStoreContext()
    // needs useEffect to alter state
    console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
                <div className="card"></div>
                {state.sessions.map((item, index) => (
                    <div key={item.id}>
                    </div>
                ))}
            </div>
        </div>
        </div >
    )
}

export default SearchedSessions