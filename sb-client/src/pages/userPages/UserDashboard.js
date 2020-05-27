import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"

function UserDashboard() {
    const [state, dispatch] = useStoreContext()
    // const [sessions, setSession] = useState();

    useEffect(() => {
        // if (loading) {
        //     dispatch({ type: "setUser", user: state.currentUser })
        //     console.log("id current user   ", state)
        //     console.log("id current user   ", props)
        //     setLoading(false)
        // }
        const currentid = state.currentUser.id
        if (state.currentUser.id === "") {
            console.log("state is null")

            API_User.verifyUser().then(function (response) {
                let userObj = {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    image: response.data.image
                }
                dispatch({ type: "setUser", user: userObj })
            });
        }

        if (state.classes.length === 0) {
            API_User.getAllClasses(currentid).then(classres => {
                console.log("coming from userdashboard - ", classres)
                dispatch({
                    type: "setClasses",
                    classes: classres.data
                })
                console.log(classres.data)
            })
        } 
         
            
            // API_User.getAllLocations().then(qresponse => {
            //     console.log(qresponse)
            // })
            // API_User.getAllUserSessions(currentid).then(sessionres => {
            //     console.log(sessionres)
        //     })
        // })

}, [state, dispatch])
console.log(state)

return (
    <div>
        <h1>Hello {state.currentUser.firstName}! </h1>
        <Profile classid={state.classid} />
        <p></p>
    </div>
)
}

export default UserDashboard