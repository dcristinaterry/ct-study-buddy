import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"
import { response } from "express"

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
        if(state.currentUser.id===""){
            console.log("state is null")

            API_User.verifyUser().then(function(response){
                let userObj = {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    image: response.data.image
                }
             
                dispatch({ type: "setUser", user: userObj })
            });
        }

        
        API_User.getAllLocations().then(qresponse =>{
            console.log(qresponse)
        })
        const currentid = state.currentuser.id
        API_User.getAllUserSessions(currentid).then(sessionres => {
            console.log(sessionres)
        })
        // 
        API_User.getAllClasses(currentid).then(classres => {
            console.log(classres)
            dispatch({
                type: "setClasses",
                classes: classres
        })
        })

    }, [state,dispatch])
    console.log(state)

    return (
        <div>

            <h1>hello user id:{state.currentUser.id}</h1>
            <Profile name={} age={} classid={}/>
            <p></p>
        </div>


    )
}

export default UserDashboard