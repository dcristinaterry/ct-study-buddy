import React from "react"
import { useStoreContext } from "../../utils/GlobalState"

function SearchedSessions() {
    const [state] = useStoreContext()
    // needs useEffect to alter state
    console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    {state.sessions.map((item, index) => (
                        <div key={item.sessionId}>
                            <div className="card" >
                               
                                Class - {item.className},
                                
                                Date - {item.sessionDate},
                                Topic - {item.sessionSubject},
                                
                                Host - {item.userName}
                                
                            </div> 
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default SearchedSessions