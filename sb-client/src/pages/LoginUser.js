import React, { useEffect, useState } from "react"



const LoginUser = () => {

    const [loginForm, setLoginForm] = useState({})

    return (

        <div>
            <form>
                <div>
                    <label for="inputStudentEmail">E-mail</label><br />
                    <input type="text" id="inputStudentEmail"></input>
                </div>
                <div>

                    <label for="inputStudenPass">password</label><br />
                    <input type="password" id="pass"></input>
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>

            </form>

        </div>


    )
}

export default LoginUser