import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import HostSessions from "../sessionInfo/hostSession"
import ParticipantSessions from "../sessionInfo/participantSession"
import SearchedSessions from "../sessionInfo/searchedSession"

function Main() {
    const [state] = useStoreContext()
    console.log(state.sessions)
    return (
        <div className="col-md-4">

            < HostSessions>

            </HostSessions>
            <ParticipantSessions>

            </ParticipantSessions>
            <SearchedSessions>

            </SearchedSessions>

        </div>
    )
}

export default Main