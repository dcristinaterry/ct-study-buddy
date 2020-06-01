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
        <div className="card text-center float-left mb-3 mr-3 sessCard">
            {/* <img className="mx-auto imgTiny" src="" alt="universiytLogo" /> */}
            <div className="card-header px-1 py-1">
                <h5 className="mb-0">{props.item.sessionSubject}</h5>
                {/* <h5>{props.item.userName}</h5> */}
            </div>
            <div className="my-1">
                <img className="mx-auto imgMain" src={props.item.userImage} alt={props.item.userName} />
            </div>
            <div className="card-body px-1 pt-1 pb-2">
                <h5 className="card-text-title mb-1">{props.item.className}</h5>
                <p className="mb-0">{props.item.sessionDate}</p>
                <p className="mb-0">Location: {props.item.Location} </p>
                <div>
                    <p className="mb-1">Num. Attendees: {props.item.participants.length}</p>
                    <button className="btn btn-primary btnShadow" onClick={() => setModalParticipantsShow(true)}>See All</button>
                    <ModalParticipants
                        participants={props.item.participants}
                        show={modalParticipantsShow}
                        onHide={() => setModalParticipantsShow(false)}
                    />
                </div>

            </div>


            <div className="card-footer text-muted px-1 py-1">
                <button className="btn btn-danger btnShadow px-1 border-dark" onClick={() => props.cardFunction(props.item.sessionId)}><i className={props.cardImage}></i>{props.buttonName}</button>
            </div>
        </div>
    )

}

export default SessionCard