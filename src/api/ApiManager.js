import axios from "axios";
const ApiManager = axios.create({
    baseURL : `http://3.34.54.187:8000`,
    responseType:'json',
    withCredentials: true,

})
export default ApiManager;