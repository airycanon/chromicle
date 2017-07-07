import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Layout, Timeline, Input} from 'antd';
import {observer, inject} from "mobx-react";
import HistoryCard from './HistoryCard';

@inject('store')
@observer
export default class App extends Component {

    render() {
        const {Header, Content, Footer} = Layout;
        const store = this.props.store;

        return (<Layout>
            <Header>
                <Row>
                    <Col span={12} offset={6} style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div className="logo"/>
                        <Input.Search placeholder="搜索历史记录" style={{width: 200, marginLeft: 'auto'}} onSearch={value => console.log(value)}
                        />
                    </Col>
                </Row>
            </Header>
            <Content>
                <Row>
                    <Col offset={6} span={12}>
                        <Timeline>
                            {
                                store.ranges.map(range => (
                                    <Timeline.Item key={range.key}>
                                        <HistoryCard key={range.key + 'cards'} title={range.key} range={range}/>
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
