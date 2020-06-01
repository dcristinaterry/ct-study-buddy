import React, { useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import Avatar from "../avatar/avatar"
import API_User from "../../utils/API_User"
import CreateSession from "../createSession/CreateSession.js"

import "./admin.css"

const AdminProfile = props => {
    const [state, dispatch] = useStoreContext()
    const [modalShow, setModalShow] = useState(false);

    // console.log(state.sessions)
    const allUsers = () => {
        console.log("get Users button clicked")
        API_User.getAllUsers().then(req => {
            console.log("return all users", req)
            dispatch({ 
                type: "setUsers",
                users: req.data })
        })
    }

    const allSessions = () => {
        console.log("session button clicked")
        API_User.getAllSessions().then(sessionResp => {
            console.log("get all sessions", sessionResp)
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
                    <div>
                        <button className="btn btn-light mx-auto mb-3 border-dark hover" onClick={() => allSessions()}>
                            View All Sessions
                        </button>
                    </div>
                    <div>
                        <button className="btn btn-light mx-auto mb-3 border-dark hover" onClick={() => allUsers()}>
                           View All Users
                         </button>
                    </div>
                    {/* <div>
                        <button className="btn btn-light mx-auto mb-3 border-dark hover" variant="primary" onClick={() => setModalShow(true)}>
                            Add New Class
                         </button>
                        <CreateClass
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div> */}
                    <div>
                        <button className="btn btn-light mx-auto mb-3 border-dark hover" variant="primary" onClick={() => setModalShow(true)}>
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

export default AdminProfile