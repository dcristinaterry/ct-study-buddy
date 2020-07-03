import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import ParticipantSessions from "./participantSession"
import Main from "../mainPanel/mainPanel.js"
import SessionCard from "../sessionCard/SessionCard"

function SearchedSessions() {
    const [state, dispatch] = useStoreContext()

    console.log("this are the sessions I got", state.sessions)
    
    useEffect(()=>{

        if(state.loading){
            dispatch({ type: "LOADING", loading: false })
            API_User.getAllUserSessions(state.currentUser.id).then(sessionResp => {
                console.log("get allclass allsessions", sessionResp)
                dispatch({
                    type: "setAllSessions",
                    sessions: sessionResp.data
                })
            })
        }
    }, [state])


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
        <div className="mt-4 mb-4 ">
            <div className="flex overflow-x-scroll">
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
    )
}

export default SearchedSessions