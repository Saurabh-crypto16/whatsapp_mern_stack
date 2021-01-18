import axios from "axios";

//this makes the base url of any request to this
const instance = axios.create({
    baseURL: "http://localhost:9000",
});

export default instance;