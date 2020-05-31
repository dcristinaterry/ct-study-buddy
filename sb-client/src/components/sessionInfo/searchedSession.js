import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import "./session.css"
import ParticipantSessions from "./participantSession"
import Main from "../mainPanel/mainPanel.js"
import SessionCard from "../sessionCard/SessionCard"

function SearchedSessions() {
    const [state, dispatch] = useStoreContext()

    console.log("this are the sessions I got", state.sessions)
    
    
    const joinSession = item => {
        console.log("join session button clicked")
        let useSess = {
            SessionId: item,
            UserId: state.currentUser.id
        }
        console.log(useSess)

        API_User.joinSession(useSess).then(req => {
            console.log("this is being sent to participate", req)

            dispatch({ type: "LOADING", loading: true })


        })
    }


    // needs useEffect to alter state
    // console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
                <div className="container card-rows mt-2 pt-2">
                    <h3>Searched Sessions</h3>
                    {state.sessions.map((item, index) => (
                        <div key={index}>
                            <SessionCard
                                item={item}
                                cardFunction={joinSession}
                                cardImage={""}
                                buttonName="Join"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchedSessions