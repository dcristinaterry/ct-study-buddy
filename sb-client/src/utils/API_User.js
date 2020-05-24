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
    }

}