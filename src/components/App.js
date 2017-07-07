import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Layout, Timeline,} from 'antd';
import {observer, inject} from "mobx-react";
import Header from './Header';
import HistoryCard from './HistoryCard';

@inject('store')
@observer
export default class App extends Component {

    render() {
        const {Content, Footer} = Layout;
        const store = this.props.store;

        return (<Layout>
            <Header/>
            <Content>
                <Row>
                    <Col offset={6} span={12}>
                        <Timeline>
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
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Chrome by airycanon
            </Footer>
        </Layout>);
    }
}
