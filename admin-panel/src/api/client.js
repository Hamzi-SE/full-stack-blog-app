import axios from "axios";

const client = axios.create({ baseURL: "https://full-stack-blog-app-backend.vercel.app/api/v1" });

export default client;
