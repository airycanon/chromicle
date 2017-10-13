import React, {Component} from 'react';
import {Row, Col, Icon, message} from 'antd';
import PropTypes from 'prop-types';
import {observer, inject} from "mobx-react";

@inject('viewStore', 'bookmarkStore')
@observer
export default class BookmarkItem extends Component {

    onBookmarkClick(node) {
        const {viewStore, bookmarkStore} = this.props;
        bookmarkStore.select(node);
        viewStore.addBreadcrumb(node);
    }

    onBookmarkSelect(node) {
        const {bookmarkStore, viewStore} = this.props;
        bookmarkStore.add(viewStore.bookmarkHistory,node);
        viewStore.bookmarkHistory = null;
        message.success(`已添加书签到 ${node.title} 中`, 3);
    }

    render() {
        const {viewStore, bookmark} = this.props;
        const style = {wordWrap: 'break-word'};

        let icon = '';

        if (bookmark.children.length) {
            icon = <Icon style={{fontSize: 16}} onClick={() => this.onBookmarkClick(bookmark)} type="right"/>
        }

        return (<Row type="flex" justify="space-between" align="middle" onClick={() => this.onBookmarkSelect(bookmark)}>
            <Col style={style} span={20}>{bookmark.title}</Col>
            <Col span={2}>{icon}</Col>
        </Row>)
    }
}

BookmarkItem.propTypes = {
    bookmark: PropTypes.object.isRequired
};
