import axios from 'axios'
export default {
    authenticate: function (loginData) {

        return axios.put("/api/user", loginData)
    },
    verifyUser: function (sessionId) {
        console.log("requesting verify")
        return axios.get("/api/user/verifyUser")
    },

    // ****************** SESSIONS **************************************
    // Gets ALL Sessions for ALL the Classes
    getAllUserSessions: function (userid) {
        return axios.get(`/api/user/info-session/${userid}/allsessions`)
    },

    getSessionsForOneClass: function (classId){
        console.log("calling info-session all one class")
        return axios.get(`/api/user/info-session/${classId}/session`)
    },

    // ****************** SESSIONS **************************************

    getAllLocations: function () {
        console.log("calling locations")
        return axios.get("/api/user/locations")
    },
    getAllClasses: function (userId) {
        console.log("get all classes for a user")
        return axios.get(`/api/user/allclasses/${userId}/classes`)
    }
}