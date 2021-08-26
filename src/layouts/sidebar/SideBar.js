import React, {useState} from 'react';
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import './sidebar.css'

function SideBar() {

    return(
        <>
            <div className={'sideHeader'}>
                <h1>FM</h1>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                // style={{  borderRight: 0,position:"fixed" }}
            >
                <Menu.Item  icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <Menu.Item key="4" icon={<ContainerOutlined />}>
                    Option 4
                </Menu.Item>
                <Menu.Item key="5" icon={<AppstoreOutlined />}>
                    Option 5
                </Menu.Item>
                <Menu.Item key="6" icon={<MenuFoldOutlined />}>
                    Option 6
                </Menu.Item>
                <Menu.Item key="7" icon={<MenuUnfoldOutlined />}>
                    Option 7
                </Menu.Item>
                <Menu.Item key="8" icon={<MailOutlined />}>
                    Option 8
                </Menu.Item>
            </Menu>
        </>
    )
}
export default SideBar
