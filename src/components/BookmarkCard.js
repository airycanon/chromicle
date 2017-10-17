import React, {Component} from 'react';
import {Card, message} from 'antd';
import BookmarkItem from './BookmarkItem';
import {inject, observer} from "mobx-react";

@inject('bookmarkStore', 'viewStore')
@observer
export default class BookmarkCard extends Component {

    onBookmarkClick(node) {
        const {viewStore, bookmarkStore} = this.props;
        bookmarkStore.select(node);
        viewStore.addBreadcrumb(node);
    }

    onBookmarkSelect(node) {
        const {bookmarkStore, viewStore} = this.props;
        bookmarkStore.add(viewStore.bookmarkHistory, node);
        viewStore.bookmarkHistory = null;
        message.success(`已添加书签到 ${node.title} 中`, 3);
    }

    render() {
        const {viewStore, bookmarkStore} = this.props;
        return (<Card className="bookmark-card" bordered={false} noHovering={true}>{
            bookmarkStore.nodes.map(bookmark => (
                <Card.Grid key={'bookmark' + bookmark.id}>
                    <BookmarkItem bookmark={bookmark} onClick={() => this.onBookmarkClick(bookmark)}
                                  onSelect={() => this.onBookmarkSelect(bookmark)}/>
                </Card.Grid>
            ))
        }</Card>);
    }
}

