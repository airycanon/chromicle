import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Layout, Timeline,} from 'antd';
import {observer, inject} from "mobx-react";
import Header from './Header';
import HistoryCard from './HistoryCard';
import Waypoint from 'react-waypoint';

@inject('store')
@observer
export default class App extends Component {

    onScrollToBottom(previousPosition, currentPosition, event) {
        this.props.store.more();
    }

    render() {
        const {Content, Footer} = Layout;
        const store = this.props.store;

        return (<Layout>
            <Header/>
            <Content>
                <Row>
                    <Col offset={6} span={12}>
                        <Timeline onScroll={this.onScroll}>
                            {
                                store.ranges.map(range => (
                                    <Timeline.Item key={range.key}>
                                        <HistoryCard key={range.key + 'cards'} range={range}/>
                                    </Timeline.Item>)
                                )
                            }
                        </Timeline>
                    </Col>
                </Row>
                <Waypoint bottomOffset={-100} scrollableAncestor={window} onEnter={this.onScrollToBottom.bind(this)}/>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Chrome by airycanon
            </Footer>
        </Layout>);
    }
}
