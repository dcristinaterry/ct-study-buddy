import React, { useState, useEffect } from "react"
import API_User from "../../utils/API_User.js"
import { useStoreContext } from "../../utils/GlobalState";
import "./styling/loginUser.css"


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

    }, [find, dispatch, state])


    const setValues = (event) => {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }
    return (
        <div className="container text-center center mt-5 pt-3">
            <form className="container">
                <div className="form text-black mx-5 py-4">
                <div>
                    <label htmlFor="inputStudentEmail">E-mail</label><br />
                    <input type="text" id="inputStudentEmail" onChange={setValues} name="email"></input>
                </div><br />
                <div>
                    <label htmlFor="inputStudenPass">Password</label><br />
                    <input type="password" id="pass" onChange={setValues} name="password"></input>
                </div><br />
                <div>
                    <button className="btn-primary" onClick={authenticateUser} > Submit </button>
                </div>
                </div>
            </form>
            
        </div>


    )
}

export default LoginUser