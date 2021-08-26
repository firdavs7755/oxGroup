import {axiosInstance} from './api'

export const dataApi={
    getData:()=>{
        return axiosInstance.get('/variations');
    }
}
