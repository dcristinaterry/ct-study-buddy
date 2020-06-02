import React, { useEffect } from "react"
import { useStoreContext } from "../../utils/GlobalState"
// import API_User from "../../utils/API_User"

function DisplayUsers() {
    // const [state, dispatch] = useStoreContext()

    // needs useEffect to alter state
    // console.log(state.sessions)
    return (
        <div className="row">
            <div className="col">
                <div className="container card-rows mt-2 pt-2">
                    <h3>Users</h3>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password </th>
                                <th scope="col">First Name </th>
                                <th scope="col">Last Name </th>
                                <th scope="col">Role </th>
                                <th scope="col">Image </th>
                            </tr>
                        </thead>
                         <tbody>
                        {state.users.map((user,id) => (
                            <tr key={user}>
                               <th scope="row">{id}</th>
                                    <td >{user.id}</td>
                                    <td >{user.email}</td>
                                    <td >{user.password} </td>
                                    <td >{user.firstName} </td>
                                    <td >{user.lastName} </td>
                                    <td >{user.role} </td>
                                    <td >{user.image} </td>
                           </tr>
                ))}
            
                        </tbody> 
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DisplayUsers