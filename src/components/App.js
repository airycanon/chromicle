import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Layout, Timeline, Modal, Card, Breadcrumb} from 'antd';
import {observer, inject} from "mobx-react";
import Header from './Header';
import HistoryCard from './HistoryCard';
import BookmarkCard from './BookmarkCard';
import Waypoint from 'react-waypoint';
import BookmarkBreadcrumb from "./BookmarkBreadcrumb";

@inject('historyStore', 'viewStore','bookmarkStore')
@observer
export default class App extends Component {

    onScrollToBottom(previousPosition, currentPosition, event) {
        this.props.historyStore.more();
    }

    componentDidMount() {
        const node = {id: '1', title: '书签栏'};
        const {viewStore, bookmarkStore} = this.props;
        bookmarkStore.select(node);
        viewStore.addBreadcrumb(node);
    }

    render() {
        const {Content} = Layout;
        const {historyStore, viewStore} = this.props;

        return (<Layout>
            <Header/>
            <Modal visible={viewStore.bookmarkHistory !== null} onCancel={() => {viewStore.bookmarkHistory = null}} footer={null}>
                <BookmarkBreadcrumb/>
                <BookmarkCard/>
            </Modal>
            <Content>
                <Row>
                    <Col offset={6} span={12}>
                        <Timeline onScroll={this.onScroll}>{
                            historyStore.ranges.map(range => (
                                <Timeline.Item key={range.key}>
                                    <HistoryCard key={'history' + range.key} range={range}/>
                                </Timeline.Item>)
                            )
                        }
                        </Timeline>
                    </Col>
                </Row>
                <Waypoint bottomOffset={-100} scrollableAncestor={window} onEnter={this.onScrollToBottom.bind(this)}/>
            </Content>
        </Layout>);
    }
}
