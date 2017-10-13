import React, {Component} from 'react';
import {Card} from 'antd';
import PropTypes from 'prop-types';
import BookmarkItem from './BookmarkItem';
import {inject, observer} from "mobx-react";

@inject('bookmarkStore', 'viewStore')
@observer
export default class BookmarkCard extends Component {

    componentDidMount() {
        const node = {id: '1', title: '书签栏'};
        const {viewStore, bookmarkStore} = this.props;
        bookmarkStore.select(node);
        viewStore.addBreadcrumb(node);
    }

    render() {
        const {viewStore, bookmarkStore} = this.props;
        return (<Card style={{paddingTop: 20, paddingBottom: 10}} bordered={false} noHovering={true}>{
            bookmarkStore.nodes.map(bookmark => (
                <Card.Grid style={{cursor: 'pointer'}} key={'bookmark' + bookmark.id}>
                    <BookmarkItem bookmark={bookmark}/>
                </Card.Grid>
            ))
        }</Card>);
    }
}

