import React, { useEffect } from "react"
import Modal from 'react-modal'
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User"
import "./modalStyle.css"

Modal.setAppElement('#root')

const ModalSessionInfo = props => {

    const [state, dispatch] = useStoreContext()

    useEffect(() => {
        if (state.loadingParticpants) {
            dispatch({ type: "LOADING-Participants", loading: false })
        }
    }, [state])

    const removeParticipant = (sessionId, userId, index) => {
        // remove that item from the array and reload component
        props.participants.splice(index, 1);
        API_User.removeParticipant({ session: sessionId, user: userId }).then(
            dispatch({ type: "LOADING-Participants", loading: true })
        )
    }
    return (

        <div className="modal-wrapper">
            <Modal
                isOpen={props.show}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => props.onHide}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="bg-green-200 bg-opacity-50 text-center font-syncopate text-xl py-2 rounded-lg">
                    <h1 className="">STUDDY SESSION</h1>
                    <h2 className="">{props.subject}</h2>
                    <div></div>

                </div>
                <div className="p-2 m-2">
                    <h3>HOST</h3>
                    <img className="imgMain" src={props.hostImage} alt={props.hostName} />
                    <p>{props.hostName}</p>
                </div>
                <p className="p-3">class:  {props.class}</p>
                <p className="p-3">Location: {props.location}</p>

                <h2>participants</h2>
                <div className="flex flex-wrap">
                {props.participants.map((item, index) => (
                    <div key={index} className="m-4">
                        <img className="imgMain " src={item.User.image} alt={item.User.firstName} />
                        {/* <a onClick={() => removeParticipant(item.SessionId, item.UserId, index)}> X </a> */}
                        <p>{item.User.firstName}  {item.User.lastName}</p>
                    </div>
                ))
                }
                </div>

                <button className="bg-gray-920 text-white-100 px-1" onClick={props.onHide}>Close</button>

            </Modal>
        </div>
    )

}

export default ModalSessionInfo;