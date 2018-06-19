
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { ROUTES_MAP } from '../../constants';
import IconHome from 'react-icons/lib/fa/home';

class Header extends Component {
    render() {
        return (
            <Menu
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <NavLink to={ROUTES_MAP.main}>
                        <IconHome /> Home
                    </NavLink>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Header;