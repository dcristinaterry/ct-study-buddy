import axios from 'axios'
export default {
    authenticate: function (loginData) {
        
        return axios.put("/api/user", loginData)
    }

}