import React, { useEffect } from "react"
import Modal from 'react-bootstrap/Modal'
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"



const ModalParticipants = props => {

    const [state, dispatch] = useStoreContext()


    useEffect(() => {
        if (state.loadingParticpants) {
            dispatch({ type: "LOADING-Participants", loading: false })
        }
    },[state])
    
    const removeParticipant = (sessionId, userId, index) => {
        // remove that item from the array and reload component
        props.participants.splice(index, 1);
        API_User.removeParticipant({ session: sessionId, user: userId }).then(
            dispatch({ type: "LOADING-Participants", loading: true })
        )
    }


    return (

        <div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        PARTICIPANTS
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {props.participants.map((item, index) => (
                        <div key={index}>
                            <a onClick={() => removeParticipant(item.SessionId, item.UserId, index)}>X</a>
                            <img className="mx-auto imgMain" src={item.User.image} alt={item.User.firstName} />
                            <p>{item.User.firstName}  {item.User.lastName}</p>

                        </div>


                    ))
                    }


                </Modal.Body>
                <Modal.Footer>

                    <button onClick={props.onHide}>Close</button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default ModalParticipants