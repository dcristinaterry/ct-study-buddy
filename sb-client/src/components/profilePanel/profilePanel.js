import React, {useState} from "react"
import { useStoreContext } from "../../utils/GlobalState"
import Avatar from "../avatar/avatar"
import API_User from "../../utils/API_User"
import CreateSession from "../createSession/CreateSession.js"

const Profile = props => {
    const [state, dispatch] = useStoreContext()
    const [modalShow, setModalShow] = useState(false);

    // console.log(state.sessions)

    const oneClassSessions = (item) => {
        console.log("class button clicked")
        API_User.getSessionsForOneClass(item).then(classSess => {
            console.log("get all sessions for one class", classSess)
            dispatch({
                type: "setAllSessions",
                sessions: classSess.data
            })
        })
    }

    const allClassSessions = () => {
        console.log("session button clicked")
        API_User.getAllUserSessions(state.currentUser.id).then(sessionResp => {
            console.log("get allclass allsessions", sessionResp)
            dispatch({
                type: "setAllSessions",
                sessions: sessionResp.data
            })
        })
    }

    const Logout = item => {
        console.log("logout button clicked")
        API_User.logoutUser(state.currentUser.id).then(logOut => {
            console.log("logout user", logOut)
        })

    }


    return (
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12">
                    <Avatar />
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    {state.classes.map((item, index) => (
                        <div key={item.id}>
                            <button className="btn btn-light mx-auto mb-3 border-dark"
                                onClick={() => oneClassSessions(item.ClassId)}
                            >
                                {item.Class.subject} {item.Class.class}
                            </button>
                        </div>
                    ))}
                    <div>
                    <button className="btn btn-light mx-auto mb-3 border-dark" onClick={() => allClassSessions()}>
                        Sessions
                     </button>
                     </div>
                    <div>
                        <button className="btn btn-light mx-auto mb-3 border-dark" variant="primary" onClick={() => setModalShow(true)}>
                           Add New Study Session
                         </button>
                        <CreateSession
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                    <div>
                    <button className="btn btn-danger mx-auto mb-3" onClick={() => Logout()}>
                        Logout
                     </button>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Profile