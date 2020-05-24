import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"

function UserDashboard() {
    // const [state, dispatch] = useStoreContext()
    // const [sessions, setSession] = useState();





    useEffect(() => {
   
        API_User.getAllLocations().then(qresponse =>{
            console.log(qresponse)
        })

    }, [])


    return (
        <h1>hello user id:</h1>
    )
}

export default UserDashboard