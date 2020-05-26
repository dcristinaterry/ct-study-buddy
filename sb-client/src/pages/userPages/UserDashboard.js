import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"

function UserDashboard() {
    const [state, dispatch] = useStoreContext()
    // const [sessions, setSession] = useState();


    useEffect(() => {
        
        API_User.getAllLocations().then(qresponse =>{
            console.log(qresponse)
        })
        // qresponse coming from classController dbModelClass
        API_User.getAllClasses().then(qresponse =>{
            console.log(qresponse)
        })
        API_User.get

    }, [])
    console.log(qresponse)
    console.log(state)
    console.log(dispatch)
    return (
        <div>
            <h1>hello user id:{state.currentuser.firstName}</h1>
            {state.currentuser.image}   
            )}
        </div>    
    )
}

export default UserDashboard