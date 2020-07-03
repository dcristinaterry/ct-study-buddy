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
        <div id="cardHosted" className="flex-initial">
       
            <div className="p-2 bg-green-200 text-gray-900  font-syncopate text-xl text-center">
                <h5 className="">{props.item.sessionSubject}</h5>
            </div>
            <div className="mb-2 -mt-2">
                <img className="h-12 w-12" src={props.item.userImage} alt={props.item.userName} />
            </div>
            <div className="">

                <p className="mb-0">{props.item.sessionDate}</p>
                <p className="mb-1">Num. Attendees: {props.item.participants.length}</p>
                <div>

                    <ModalParticipants
                        class={props.item.className}
                        location={props.item.Location}
                        participants={props.item.participants}
                        show={modalParticipantsShow}
                        onHide={() => setModalParticipantsShow(false)}
                    />
                </div>

            </div>


            <div className="">
                <button className="btn btn-primary btnShadow" onClick={() => setModalParticipantsShow(true)}>details</button>
                <button className="btn btn-danger btnShadow px-1 border-dark" onClick={() => props.cardFunction(props.item.sessionId)}><i className={props.cardImage}></i>{props.buttonName}</button>
            </div>
        </div>
    )

}

export default SessionCard