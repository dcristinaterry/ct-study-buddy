import React, { useState } from "react"
import ModalParticipants from "../modalParticipants/ModalParticipants.js"
import "./session.css"

const SessionCard = props => {
    const [modalParticipantsShow, setModalParticipantsShow] = useState(false);
    console.log(props.item)

    const check = () => {
        console.log("got clicked", props.item.participants.length)
        if (props.item.participants.lentgth > 0) {
            console.log("got clicked")
            setModalParticipantsShow(true)
        }
    }

    return (
        <div id="cardHosted" className="flex-initial w-46 bg-white-100 bg-opacity-50 rounded-lg font-syncopate rounded-lg mr-10">
            <button onClick={() => setModalParticipantsShow(true)}>
                <div className="p-3 bg-green-200 text-gray-900  text-xl text-center rounded-t-lg">
                    <h5 className="">{props.item.sessionSubject}</h5>
                </div>
                <div className="mb-2 -mt-3 ml-4">
                    <img className="h-12 w-12" src={props.item.userImage} alt={props.item.userName} />
                </div>
                <div className="m-4 text-gray-900 bg-opacity-75 bg-white-101 p-2 rounded-lg ">

                    <p className="">{props.item.sessionDate}</p>
                    <p className="">No. Attendees: <span>{props.item.participants.length}</span></p>

                </div>

            </button>
            <div className=" bg-gray-200 rounded-b-lg p-2 bg-opacity-75 text-center ">
                
                    <button className=" bg-gray-920 text-white-100 py-1 px-3 rounded-lg " onClick={() => props.cardFunction(props.item.sessionId)}><i className={props.cardImage}></i>{props.buttonName}</button>

               
            </div>

            <div>
                <ModalParticipants
                    class={props.item.className}
                    location={props.item.Location}
                    participants={props.item.participants}
                    show={modalParticipantsShow}
                    hosting="true"
                    onHide={() => setModalParticipantsShow(false)}
                />
            </div>
        </div>
    )

}

export default SessionCard