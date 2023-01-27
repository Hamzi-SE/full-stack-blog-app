import axios from "axios";

const client = axios.create({ baseURL: "http://192.168.10.3:8080/api/v1" });

export default client;
