import React, {useState} from "react"
import { useStoreContext } from "../../utils/GlobalState"
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
        <div className="relative">
            <div className="mr-10 ml-10">
                <div className="w-full my-10">
                    {state.classes.map((item, index) => (
                        <div className="bg-gray-920 rounded-lg mb-4 w-full" key={item.id}>
                            <button className="text-white-101  font-syncopate text-2xl text-center w-full p-2"
                                onClick={() => oneClassSessions(item.ClassId)}
                            >
                                {item.Class.subject} {item.Class.class}
                            </button>
                        </div>
                    ))}
                    <div className="bg-gray-900 rounded mb-4 w-full">
                    <button className="text-white-101  font-syncopate text-2xl text-center w-full p-2" onClick={() => allClassSessions()}>
                        All-Sessions
                     </button>
                     </div>
                    <div className="bg-green-200  rounded w-full mb-4">
                        <button className="text-gray-920  font-syncopate text-2xl text-center w-full p-2" variant="primary" onClick={() => setModalShow(true)}>
                           Add New Study Session
                         </button>
                        <CreateSession
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                    <div className="bg-white-101 rounded w-full">
                    <button className="text-gray-920  font-syncopate text-2xl text-center w-full p-2" onClick={() => Logout()}>
                        Logout
                     </button>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Profile