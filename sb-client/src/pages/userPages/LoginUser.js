import React, { useState, useEffect } from "react"
import API_User from "../../utils/API_User.js"
import { useStoreContext } from "../../utils/GlobalState";




const LoginUser = () => {
    const [state, dispatch] = useStoreContext();
    const [loginForm, setLoginForm] = useState({})
    const [find , setFind] = useState(false);

    const authenticateUser = (event) => {
        event.preventDefault()
        setFind(true);
    }

    useEffect(()=>{

        if(find){
            API_User.authenticate(loginForm)
            .then(response => {
                // console.log(response.data.role)
                console.log(response)
                dispatch({ type: "setUser", user: response.data })
                console.log(loginForm)
                if (response.data.role === "admin") {
                    window.location.href="/adminDashboard"
                    
                } else (
                 window.location.href="/userDashboard"
                  
                )

            });
        }

    }, [find, loginForm, state, dispatch])


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
                    <input type="submit"  value="Submit" onClick={authenticateUser} />
                </div>

            </form>

        </div>


    )
}

export default LoginUser