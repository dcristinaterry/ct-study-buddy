import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import HostSessions from "../sessionInfo/hostSession"
import ParticipantSessions from "../sessionInfo/participantSession"
import SearchedSessions from "../sessionInfo/searchedSession"

function Main() {
    const [state] = useStoreContext()
    console.log(state.sessions)
    return (
        <div className="container" style={ { background: 'url("./Berkeley_campus.jpg") no-repeat center center fixed 0.5' } }>

            <HostSessions>

            </HostSessions>
            <ParticipantSessions>

            </ParticipantSessions> 
            <SearchedSessions>

            </SearchedSessions>

        </div>
    )
}

export default Main