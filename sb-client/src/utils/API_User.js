import axios from 'axios'
export default {
    authenticate: function (loginData) {
        return axios.get("/api/user", loginData)
    }
}