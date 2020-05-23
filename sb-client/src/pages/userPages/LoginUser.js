import React, { useState} from "react"
import API_User from "../../utils/API_User.js"



const LoginUser = () => {

    const [loginForm, setLoginForm] = useState({})
    const [landingPage, setLandingPage] = useState()

    const authenticateUser = (event) => {
        event.preventDefault()
        API_User.authenticate(loginForm)
        .then(response => {
            console.log(response)
            console.log(loginForm)
            if(response.data.role ==="admin"){
                setLandingPage("landingPageAdmin")
            }else(
                setLandingPage("userDashboard")
            )
        });
    }

    const setValues = (event) => {
        const {name, value} = event.target
        setLoginForm({...loginForm,[name]:value})
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