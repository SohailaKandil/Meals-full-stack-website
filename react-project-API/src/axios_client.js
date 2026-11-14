import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL


const Axios_client = axios.create(
    {
        baseURL: `${BASE_URL}/api`
    }
)

Axios_client.interceptors.request.use((config) => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    }
)

Axios_client.interceptors.response.use(
    (response) => {
        return response
    },

    (error)=>{
        console.log("i am here")
        if (error.response?.status === 401){
            localStorage.removeItem("token")
        }
        throw error
    }
)

export default Axios_client