import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {inject, observer} from "mobx-react";

@inject('viewStore', 'bookmarkStore')
@observer
export default class BookmarkBreadcrumb extends Component {

    onBreadcrumbClick(node, index) {
        this.setState({selected: node.id});

        const {viewStore, bookmarkStore} = this.props;
        bookmarkStore.select(node);
        viewStore.changeBreadcrumb(index);
    }

    render() {
        const {viewStore} = this.props;
        return (<Breadcrumb>{
            viewStore.breadcrumbs.map((breadcrumb, index) => (
                <Breadcrumb.Item style={{cursor: 'pointer'}} onClick={() => this.onBreadcrumbClick(breadcrumb, index)}
                                 key={'breadcrumb' + breadcrumb.id}>
                    {breadcrumb.title}
                </Breadcrumb.Item>
            ))
        }</Breadcrumb>);
    }
}

