import axios from 'axios'
export default {
    authenticate: function (loginData) {
        
        return axios.put("/api/user", loginData)
    }, 
    verifyUser: function(sessionId){
        console.log("requesting verify")
        return axios.get("/api/user/verifyUser")
    },

    getAllUserSessions: function(userid){
        return axios.get(`/api/user/info-session/${userid}/allsessions`)
    },
    getAllLocations: function(){
        console.log("calling locations")
        return axios.get("/api/user/locations")
    }

}