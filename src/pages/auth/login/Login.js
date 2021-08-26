import React, {useState} from "react";
import './login.css'
import {Button, Form, Input} from "antd";
import {authApi} from "../../../services/auth";
import axios from "axios";
import {Redirect,useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {setUserToken} from "../../../redux/actions/userAction";

function Login({setTokenn}) {
    const history = useHistory();
    const [form] = Form.useForm();
    const formData = new URLSearchParams();
    const [data,setData]=useState();
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const handleSubmit=async (values)=>{
        formData.append('_username', values._username);
        formData.append('_password', values._password);
        formData.append('_subdomain', values._subdomain);

        axios.post('https://face.ox-sys.com/security/auth_check',formData,config)
            .then(res=> {
                console.log('res', res)
                localStorage.setItem('token',res.data.token);
                if(res.status===200){
                    setTokenn(res.data.token)
                    history.push('/fructis')
                }
            });
    }
    return(
        <div className={'login-wrap'}>
            {/*{console.log('data',data)}*/}
            <Form
                form={form}
                name="auth"
                onFinish={handleSubmit}
                scrollToFirstError
            >
               <Form.Item
                    label={'username'}
                    key="_username"
                    name="_username">
                    <Input
                        // defaultValue={eObj?eObj.userId:"df"}
                        size="middle"
                        placeholder="username" />
                </Form.Item>
                <Form.Item
                    key="_password"
                    label={'password'}
                    name="_password">
                    <Input
                        size="middle"
                        placeholder="password" />
                </Form.Item>
                <Form.Item
                    key="_subdomain"
                    label={'subdomin'}
                    name="_subdomain">
                    <Input
                        size="middle"
                        placeholder="subdomain"/>
                </Form.Item>
                <Form.Item>
                    <div className="d-flex justify-content-between" style={{width:'100%'}}>
                        <Button htmlType={'submit'} block type={"primary"} >Submit</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
const mstp = createStructuredSelector({

})
const mdtp = dispatch =>({
    setTokenn:(token)=>dispatch(setUserToken(token)),
})
export default connect(mstp,mdtp)(Login);
