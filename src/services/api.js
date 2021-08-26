import axios from "axios";

export let axiosInstanceNotToken = axios.create({
    baseURL : "https://face.ox-sys.com",
});
export let axiosInstance = axios.create({
    baseURL : "https://face.ox-sys.com",
});
