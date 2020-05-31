import React , {useState}from "react"
import ModalParticipants from "../modalParticipants/ModalParticipants.js"

const SessionCard = props => {
    const [modalParticipantsShow, setModalParticipantsShow] = useState(false);

    return (
        <div className="card text-center float-left py-2 mb-3 mr-3 sessCard">
            <img className="mx-auto imgMain" src="" alt="universiytLogo" />
            <div className="card-header">
                <h1>{props.item.sessionSubject}</h1>
                <h3>{props.item.userName}</h3>
            </div>
            <div>
                <img className="mx-auto imgMain" src={props.item.userImage} alt={props.item.userName} />
            </div>
            <div className="card-body">
                <h3 className="card-text-title">Class:{props.item.className}</h3>
                <p>Date:  {props.item.sessionDate}</p>
                <p>Location: {props.item.location} </p>
                <div>
                    <p>Num. Attendees: {props.item.participants.length}</p>
                    <button onClick={()=>setModalParticipantsShow(true)}>See All</button>
                    <ModalParticipants
                        participants = {props.item.participants}
                        show={modalParticipantsShow}
                        onHide={() => setModalParticipantsShow(false)}
                    />
                </div>


            </div>


            <div className="card-footer text-muted">
                <button className="text-danger delBtn mx-auto mt-2 mb-1" onClick={() => props.cardFunction(props.item.sessionId)}><i className={props.cardImage}></i>{props.buttonName}</button>
            </div>
        </div>
    )

}

export default SessionCard