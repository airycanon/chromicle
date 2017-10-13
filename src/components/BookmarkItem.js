import React, {Component} from 'react';
import {Row, Col, Icon} from 'antd';
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
        const {viewStore} = this.props;
        viewStore.selectedBookmark = node;
    }

    render() {
        const {viewStore, bookmark} = this.props;
        const style = {wordWrap: 'break-word'};
        if (viewStore.selectedBookmark && viewStore.selectedBookmark.id === bookmark.id) {
            style.color = '#3143fa';
        }

        let icon = '';

        if (bookmark.children.length) {
            icon = <Icon style={{fontSize: 16}} onClick={() => this.onBookmarkClick(bookmark)} type="right"/>
        }

        return (<Row type="flex" justify="space-between" align="middle"
                     onClick={() => this.onBookmarkSelect(bookmark)}>
            <Col style={style} span={20}>{bookmark.title}</Col>
            <Col span={2}>{icon}</Col>
        </Row>)
    }
}

BookmarkItem.propTypes = {
    bookmark: PropTypes.object.isRequired
};
