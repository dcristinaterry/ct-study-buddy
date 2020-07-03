import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"
import Jumbotron from "../../components/jumbotron/jumbotron"
import Main from "../../components/mainPanel/mainPanel"
import Avatar from "../../components/avatar/avatar"


const UserDashboard = props => {
    const [state, dispatch] = useStoreContext();
    const [mounted, setMounted] = useState(true);
    // const [sessions, setSession] = useState();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (mounted) {
            setMounted(false);

            console.log("Mounting")

            API_User.verifyUser().then(function (response) {
                let userObj = {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    image: response.data.image
                }

                dispatch({ type: "setUser", user: userObj })
                // console.log(response)

                API_User.getAllClasses(response.data.id).then(classres => {
                    // console.log("coming from userdashboard - ", classres)
                    dispatch({
                        type: "setClasses",
                        classes: classres.data
                    })
                })
                API_User.getHostedSessions(response.data.id).then(resHostedSessions => {
                    dispatch({
                        type: "setHostedSessions",
                        sessions: resHostedSessions.data
                    })
                })

                API_User.getAllParticipatingSessions(response.data.id).then(resParticipatingSessions => {
                    // console.log("getting participating sessions")
                    dispatch({
                        type: "setParticipatingSessions",
                        sessions: resParticipatingSessions.data
                    })
                })
                API_User.getAllLocations().then(qresponse => {

                    // console.log(qresponse)

                    dispatch({
                        type: "setLocations",
                        locations: qresponse.data
                    })
                })

            });
        }
    }, [mounted, state, dispatch])


    console.log(state)

    return (

        <div className="absolute w-screen  h-full userDashBack bg-center bg-cover bg-opacity-100 " >

            <div className="py-12 border-b-4 border-white-100" >
                <div className=" text-center">
                    <h1 className="font-pacifico text-8xl text-white-100 text-center">Study Buddy</h1>
                </div>

            </div>


            <div className="flex flex-wrap m-10 ">

                <div id="leftPannel" className=" bg-opacity-25 bg-white-100 lg:w-3/12 rounded-lg ">

                    <div className="-mt-32 ml-32">
                        <Avatar />
                    </div>
                    <div className="mt-20">
                        <div className="">
                            <h1 className="font-lexend text-5xl text-white-100 text-center" >Class-Sessions</h1>
                        </div>

                        <div className="">
                            <Profile classid={state.classid} />
                        </div>

                    </div>

                </div>

                <div className="w-1/12 m-0 p-0"></div>

                <div id="mainPannel" className=" lg:w-8/12  rounded-lg">
                    <Main />
                </div>


            </div>

        </div>

    )
}

export default UserDashboard