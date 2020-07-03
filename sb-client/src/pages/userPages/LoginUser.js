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

    }, [find, dispatch, state])


    const setValues = (event) => {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }
    return (
        <div className="absolute bg-center w-screen  h-screen bodyBack">

            <div className="mt-24" >
                <div className=" text-center">
                    <h1 className="font-pacifico text-8xl text-white-100 text-center">Study Buddy</h1>

                </div>

            </div>


            <div className="absolute md:mt-24 lg:mt-56 xl:mt-56 m-16 md:m-0 md:h-80 " >
                <div className="relative md:flex md:flex-wrap  bg-black-900 ">
                    <div className="md:w-1/4 lg:w-1/3 md:flex hidden shadow-none">
                        <img className="object-cover object-center w-full rounded-none" src="./assets/geometry-1023846_1920.jpg" />
                    </div>


                    <div className="md:w-2/4 lg:w-1/3 relative overflow-auto">
                        <div className="flex overflow-auto">
                            {/* image middle */}
                            <img className="object-cover object-center w-full h-full rounded-none " src="./assets/back-to-school-2941924_1920.jpg" />


                            {/* form */}
                            <div className="absolute w-full" >
                                <div className="relative overflow-auto ">
                                    <div className="md:w-9/12 sm:ml-6 md:ml-4 xl:ml-10 sm:mt-32 md:mt-16 lg:mt-20 xl:mt-40 ">
                                        <form className=" text-white-100 text-2xl lg:text-2xl  xl:text-4xl  ">

                                            <div className="flex items-center mb-4">
                                                <div className="w-1/3 pr-2">
                                                    <label htmlFor="inputStudentEmail">E-mail</label>
                                                </div>
                                                <div className="w-2/3 pl-4">
                                                    <input type="text" id="inputStudentEmail" onChange={setValues} name="email"></input>
                                                </div>

                                            </div>
                                            <div className="flex items-center mb-4">

                                                <div className="w-1/3">
                                                    <label htmlFor="pass">Password</label>
                                                </div>
                                                <div className="w-2/3 pl-4">
                                                    <input type="password" id="pass" onChange={setValues} name="password"></input>
                                                </div>

                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-1/3"></div>
                                                <div className="w-2/3 pl-4">
                                                    <button className="bg-gray-920 hover:bg-gray-900 text-white font-bold  px-8 rounded focus:outline-none focus:shadow-outline" onClick={authenticateUser}> Submit </button>
                                                </div>

                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="md:w-1/4 lg:w-1/3 md:flex hidden ">
                        <img className="object-cover object-center w-full rounded-none " src="./assets/people-2557399_1920.jpg" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginUser