import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
import PropTypes from 'prop-types';

export default class BookmarkItem extends Component {
    render() {
        const {onSelect, onClick, bookmark} = this.props;

        let icon = '';

        if (bookmark.children.length) {
            icon = <Icon onClick={onClick} type="right"/>
        }

        return (<Row type="flex" justify="space-between" align="middle">
            <Col span={20} onClick={onSelect}>{bookmark.title}</Col>
            <Col span={2}>{icon}</Col>
        </Row>)
    }
}

BookmarkItem.propTypes = {
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    bookmark: PropTypes.object.isRequired
};
