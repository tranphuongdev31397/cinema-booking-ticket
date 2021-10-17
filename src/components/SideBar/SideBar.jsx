
import {
    BookOutlined,
    CalendarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./SideBar.css";

const { SubMenu } = Menu;

export default class SideBar extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div className="bar-container">
                {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button> */}
                <Menu
                    defaultSelectedKeys={[`${this.props.defaultIndex}`]}
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                    className="menu"
                    style={{ marginTop: '30px' }}
                    
                >
                    <Menu.Item key="1" icon={<UserOutlined  />}>
                        <Link to="/admin/user-management">Quản lí người dùng</Link>
                        
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BookOutlined />}>
                        <Link to="/admin/movie-management">Quản lí phim</Link>
                        
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CalendarOutlined />}>
                        <Link to="/admin/show-movie-management">Quản lí lịch chiếu</Link>
                        
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

