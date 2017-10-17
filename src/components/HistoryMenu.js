import React, {Component} from 'react';
import {Dropdown, Menu, Icon} from 'antd';
import PropTypes from 'prop-types';

export default class HistoryMenu extends Component {

    render() {
        return (<Dropdown overlay={
            <Menu onClick={this.props.click}>
                <Menu.Item key="remove">
                    <a rel="noopener noreferrer">删除</a>
                </Menu.Item>
            </Menu>
        }>
            <a className="ant-dropdown-link">
                <Icon type="down-circle-o"/>
            </a>
        </Dropdown>);
    }

}

HistoryMenu.propTypes = {
    onRemove: PropTypes.func.isRequired
}
