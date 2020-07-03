import React from "react"
import { useStoreContext } from "../../utils/GlobalState"
import HostSessions from "../sessionInfo/hostSession"
import ParticipantSessions from "../sessionInfo/participantSession"
import SearchedSessions from "../sessionInfo/searchedSession"

function Main() {
    const [state] = useStoreContext();

    return (
        <div className="">
            <div className="">
                <h3 className="font-lexend text-4xl text-white-100 text-center bg-opacity-50 bg-gray-920 p-2">Hosted Sessions</h3>
                <div>
                    <HostSessions />
                </div>

            </div>

            <div>
                <h3 className="font-lexend  text-4xl text-white-100 text-center bg-opacity-50 bg-gray-920 p-2">Participating Sessions</h3>
                <ParticipantSessions />
            </div>


            <div >
                <h3 className="font-lexend text-4xl text-white-100 text-center bg-opacity-50 bg-gray-920  p-2">Hosted Sessions</h3>
                <SearchedSessions />
            </div>

        </div>
    )
}

export default Main