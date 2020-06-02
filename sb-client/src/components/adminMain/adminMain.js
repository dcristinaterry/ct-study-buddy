import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
// import HostSessions from "../sessionInfo/hostSession"
// import ParticipantSessions from "../sessionInfo/participantSession"
import SearchedSessions from "../sessionInfo/searchedSession"
import ViewUsers from "../viewUsers/ViewUsers"

function Main() {
    // const [state] = useStoreContext()
    // console.log(state.sessions)
   
    return (
        <div className="container" style={ { background: 'url("./Berkeley_campus.jpg") no-repeat center center fixed 0.5' } }>
            <ViewUsers />

            <SearchedSessions />

        </div>
    )
}

export default Main