import React from "react";
import { Layout } from 'antd';
import SideBar from "./sidebar/SideBar";
import Header1 from "./header/Header1";
import Footer1 from "./footer/Footer1";
import Content1 from "./content/Content1";
const { Header, Footer, Sider, Content } = Layout;
const style={
    padding:0,
    backgroundColor:'rgba(137,225,229,0.23)'
}
const headerStyle={
    padding:0,
    backgroundColor:'rgba(137,225,229,0.23)',
    height:'91px'
}
const siderSt={
    minHeight:'100vh'
}
function Layouts({children}) {
    return(
        <>
            <Layout>
                <Sider style={{ minHeight: '100vh',backgroundColor:'white',color:'white'}} width={240} trigger={false} collapsible >
                    <SideBar/>
                </Sider>
                <Layout>
                    <Header style={headerStyle}><Header1/></Header>
                    <Content>
                        <Content1/>
                    </Content>
                    <Footer style={style}>
                        <Footer1/>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
export default Layouts;
