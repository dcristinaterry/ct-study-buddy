import React, { useState, useEffect } from "react"
import API_User from "../../utils/API_User.js"
import { useStoreContext } from "../../utils/GlobalState";
import { useForm } from "react-hook-form";



const LoginUser = (props) => {
    const [state, dispatch] = useStoreContext();
    const [loginForm, setLoginForm] = useState({})

    const { handleSubmit, register, errors } = useForm();

    const authenticateUser = (event) => {
        // event.preventDefault()
        // setFind(true);
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


    const setValues = (event) => {
        const { name, value } = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }
    //  w-screen  h-screen absolute
    return (
        <div className="bg-center bg-cover">

            <div className="mt-24" >
                <div className=" text-center">
                    <h1 className="font-pacifico text-5xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-9xl text-white-100 text-center">Study Buddy</h1>
                </div>

            </div>

            <div className="absolute md:mt-24 lg:mt-56 xl:mt-56 md:m-0 md:h-80 mt-12 w-full" >
                <div className="relative md:flex md:flex-wrap bg-black-900 sm:p-4 md:p-0 ">
                    <div className="md:w-1/4 lg:w-1/3 md:flex hidden shadow-none imageLeft bg-center ">
                      
                    </div>

                    <div className="md:w-2/4 lg:w-1/3 imageCenter bg-center bg-cover"  >
                        <form
                            className="text-white-100 text-xl lg:text-xl xl:text-4xl px-8 pt-6 pb-8  max-w-sm m-auto"
                            onSubmit={handleSubmit(authenticateUser)}
                        >
                            <label className="block " htmlFor="inputStudentEmail">E-mail</label>
                            <input
                                type="text"
                                id="inputStudentEmail"
                                className="text-gray-920 opacity-75 w-full pr-2"
                                onChange={setValues}
                                name="email"
                                ref={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                    }
                                })}
                               
                            >
                            </input>
                            {errors.email && <p className="font-mono text-xs text-red-700 ">please enter a valid e-mail</p>}
                          
                            <label className="block mt-4 " htmlFor="pass">Password</label>
                            <input type="password" className="text-gray-920 opacity-75 w-full pr-2" id="pass" onChange={setValues} name="password"
                              ref={register({
                                required: "Required"
                            })}
                            
                            ></input>
                            {errors.password && <p className="font-mono text-xs text-red-700 ">please enter a valid password</p>}
                           
                            <div className="flex items-center  mt-6">
                                <button className="rounded mx-auto bg-gray-100 text-gray-920 hover:bg-gray-920 hover:text-white-100 text-lg py-1 px-2  " type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="md:w-1/4 lg:w-1/3 md:flex hidden imageRight bg-center bg-cover">
                       
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginUser