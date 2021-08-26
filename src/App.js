import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layouts from "./layouts/Layouts";
import Login from "./pages/auth/login/Login";
import Fructis from "./pages/fructis/Fructis";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectToken} from "./redux/actions/user_selector";
import Auth from "./pages/auth";
import {axiosInstance} from "../src/services/api";

function ForAuthenticatedUsers(){
    return(
        <>
            <Route exact path="/fructis" component={Layouts} />
            <Redirect to={'fructis'}/>
        </>
    )
}

function App({token}) {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;

    return (
      <>
          <Switch>
          {
              token?<ForAuthenticatedUsers/>:<Auth/>
          }
          </Switch>
      </>
  );
}

const mstp = createStructuredSelector({
    token: selectToken,
})
const mdtp = dispatch =>({

})
export default connect(mstp,null) (App);
