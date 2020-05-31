import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import "./session.css"

function HostSessions() {
    const [state, dispatch] = useStoreContext()

    useEffect(() => {

        // state.loading = false;
        if (state.loading) {
            dispatch({ type: "LOADING", loading: false })
            API_User.getHostedSessions(state.currentUser.id).then(resHostedSessions => {
                dispatch({
                    type: "setHostedSessions",
                    sessions: resHostedSessions.data
                })
            })

        }

    }, [state])

    const deleteSession = (sessionId) =>{
        console.log("deleting now")
        API_User.deleteStudySession(sessionId).then(deleteResponse =>{
            dispatch({type:"LOADING", loading: true})
            console.log(deleteResponse)
        })
    }

    // needs useEffect to alter state
    return (
        <div className="row">
            <div className="col">
                <div className="container card-rows mt-2 pt-2">
                    <h3>Hosted Sessions</h3>
                    {state.hostedSessions.map((item, index) => (
                        <div key={item.sessionId}>
                            <div className="card text-center float-left py-2 mb-3 mr-3 sessCard">

                                Topic - {item.sessionSubject}
                                <br />
                                Class - {item.className}
                                <br />
                                Date - {item.sessionDate}
                                <br />
                                <p className="text-danger delBtn mx-auto mt-2 mb-1" onClick ={ () => deleteSession(item.sessionId)}><i className="fa fa-trash"></i></p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default HostSessions