import {axiosInstanceNotToken} from "./api";

export const authApi={
    login:(values)=>{
        axiosInstanceNotToken.post('/security/auth_check', values,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}
