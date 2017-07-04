import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Layout, Timeline, Card} from 'antd';
import {PropTypes, observer} from "mobx-react";

@observer
export default class App extends Component {

    render() {
        const {Header, Content, Footer} = Layout;
        const store = this.props.store;
        return (<Layout>
            <Header className="header">
                <div className="logo"/>
            </Header>
            <Content style={{padding: '0 16px'}}>
                <Row>
                    <Col offset={6}>
                        <Card>
                            <Timeline>
                                {
                                    Object.keys(store.ranges).map(range => (
                                        <Timeline.Item>
                                            {range}
                                            {
                                                store.ranges[range].map(history => (
                                                        <Row style={{padding: '5px 0'}}>
                                                            <a href={history.url}>{history.title} {history.visitCount}</a>
                                                        </Row>
                                                    )
                                                )
                                            }
                                        </Timeline.Item>)
                                    )
                                }
                            </Timeline>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Chrome by airycanon
            </Footer>
        </Layout>);
    }
}

App.propTypes = {
    store: PropTypes.observableObject
};
