import axios from 'axios'
export default {
    authenticate: function (loginData) {
        return axios.put("/api/user", loginData)
    }, 
    getAllUserSessions: function(){
        return axios.get("/api/user/:userid/allsessions")
    },
    getAllLocations: function(){
        console.log("calling locations")
        return axios.get("/api/user/locations")
    },
    getAllClasses: function(userId){
        console.log("get all classes for a user")
        return axios.get(`/api/user/allclasses/${userId}/classes`)
    }
    
}