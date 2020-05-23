import React, { useState, useEffect } from "react"
import API_User from "../../utils/API_User.js"
import {Redirect} from "react-router-dom"



const LoginUser = () => {

    const [loginForm, setLoginForm] = useState({})
    const [landingPage, setLandingPage] = useState()
    const [find , setFind] = useState(false);

    const authenticateUser = (event) => {
        event.preventDefault()

        setFind(true);
        // API_User.authenticate(loginForm)
        //     .then(response => {
        //         console.log(response.data.role)
        //         // console.log(response)
        //         console.log(loginForm)
        //         if (response.data.role === "admin") {

        //             setLandingPage("/landingPageAdmin")
        //         } else (
        //            Redirect("/userDashboard")
        //             // setLandingPage("/userDashboard")
        //         )

        //     });
    }

    useEffect(()=>{

        if(find){
            API_User.authenticate(loginForm)
            .then(response => {
                console.log(response.data.role)
                // console.log(response)
                console.log(loginForm)
                if (response.data.role === "admin") {
                    window.location.href="/adminDashboard"
                    setLandingPage("/landingPageAdmin")
                } else (
                 window.location.href="/userDashboard"
                    // setLandingPage("/userDashboard")
                )

            });
        }

    }, [find, landingPage])


    const setValues = (event) => {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="inputStudentEmail">E-mail</label><br />
                    <input type="text" id="inputStudentEmail" onChange={setValues} name="email"></input>
                </div>
                <div>

                    <label htmlFor="inputStudenPass">password</label><br />
                    <input type="password" id="pass" onChange={setValues} name="password"></input>
                </div>
                <div>
                    <input type="submit" href={landingPage} value="Submit" onClick={authenticateUser} />
                </div>

            </form>

        </div>


    )
}

export default LoginUser