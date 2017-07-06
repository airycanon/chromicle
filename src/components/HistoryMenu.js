import React, {Component} from 'react';
import {Dropdown, Menu, Icon} from 'antd';
import PropTypes from 'prop-types';

export default class HistoryMenu extends Component {

    render() {
        return (<Dropdown overlay={
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">删除</a>
                </Menu.Item>
            </Menu>
        }>
            <a className="ant-dropdown-link" href="#">
                <Icon type="down-circle-o"/>
            </a>
        </Dropdown>);
    }
}
