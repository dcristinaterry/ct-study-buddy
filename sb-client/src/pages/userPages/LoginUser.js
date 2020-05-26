import React, { useState, useEffect } from "react"
import API_User from "../../utils/API_User.js"
import { useStoreContext } from "../../utils/GlobalState";




const LoginUser = props => {
    const [state, dispatch] = useStoreContext();
    const [loginForm, setLoginForm] = useState({})
    const [find, setFind] = useState(false);

    const authenticateUser = (event) => {
        event.preventDefault()
        setFind(true);
    }

    useEffect(() => {

        if (find) {
            setFind(false);
            API_User.authenticate(loginForm)
                .then(response => {
                    // console.log(response.data.role)
                    console.log(response)

                    let userObj = {
                        id: response.data.id,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        image: response.data.image
                    }
                 
                    dispatch({ type: "setUser", user: userObj })
                    console.log(loginForm)
                    console.log(state)
                    if (response.data.role === "admin") {
                      
                        props.history.push("/adminDashboard")
                        

                    } else {
                     
                        props.history.push("/userDashboard")
                        
                    }
                   
                });
        }

    }, [find,dispatch,state])


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
                    <input type="submit" value="Submit" onClick={authenticateUser} />
                </div>

            </form>

        </div>


    )
}

export default LoginUser