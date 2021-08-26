import React from "react";
import {Redirect, Route} from "react-router-dom";
import Login from "./login/Login";

const Auth=()=>{
    return (
        <>
            <Route path = '/login'><Login/></Route>
            <Route render={() => <Redirect to="/login" />}></Route>
        </>
    )
}

export default Auth;



