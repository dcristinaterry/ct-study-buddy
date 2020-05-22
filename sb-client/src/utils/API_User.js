import axios from 'axios'
export default {
    authenticate: function (loginData) {
        console.log(loginData)
        return axios.put("/api/user", loginData)
    }
}