import React, { useState } from "react"
import API_User from "../utils/API_User.js"
const LoginUser = () => {

    const [loginForm, setLoginForm] = useState({})
    
   

    const authenticateUser = () =>{
        const response = API_User.authenticate(loginForm);
        console.log(response)
    }

    const setvalues= (event) =>{
        const {name, value} = event.target
        setLoginForm({[name]:value})
    }

    return (

        <div>
            <form>
                <div>
                    <label htmlFor="inputStudentEmail">E-mail</label><br />
                    <input type="text" id="inputStudentEmail" onChange={setvalues} name="email"></input>
                </div>
                <div>

                    <label htmlFor="inputStudenPass">password</label><br />
                    <input type="password" id="pass"  onChange={setvalues} name="password"></input>
                </div>
                <div>
                    <input type="submit" value="Submit" onClick={authenticateUser} />
                </div>

            </form>

        </div>


    )
}

export default LoginUser