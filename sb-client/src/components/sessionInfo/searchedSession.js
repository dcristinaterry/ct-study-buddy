import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import ParticipantSessions from "./participantSession"
import Main from "../mainPanel/mainPanel"
import "./session.css"

function SearchedSessions() {
    const [state, dispatch] = useStoreContext()

    const joinSession = item => {
        console.log("join session button clicked")
        let useSess = {
            SessionId: item,
            UserId: state.currentUser.id
        }
        console.log(useSess)
        API_User.joinSession(useSess).then(req => {
            console.log("this is being sent", req)
            // page refresh needs to happen here
            window.location.reload(false);
        })
    }

    // needs useEffect to alter state
    // needs useEffect to filter out sessions where user is already host or participant
    console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
                <div className="container card-rows mt-2 pt-2">
                    <h3>Searched Sessions</h3>
                    {state.sessions.map((item, index) => (
                        <div key={item.sessionId}>
                            <div className="card text-center float-left py-2 mb-3 mr-3 sessCard">

                                Topic - {item.sessionSubject}
                                <br />
                                Class - {item.className}
                                <br />
                                Date - {item.sessionDate}
                                <br />
                                <img className="mx-auto imgMain" src={item.userImage} alt="..." />
                                <br />
                                <button className="btn btn-primary mx-auto mb-1" onClick={() => joinSession(item.sessionId)}>
                                    Join
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default SearchedSessions