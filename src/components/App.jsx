import React, {Component} from 'react';
import '../assets/less/index.less';
import {Col, Layout, Menu, Calendar, Card, Radio} from 'antd';

export default class App extends Component {

    render() {
        const {Header, Content, Footer, Sider} = Layout;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Col style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Radio.Group style={{marginLeft: 'auto'}}>
                            <Radio.Button value="large">日历视图</Radio.Button>
                            <Radio.Button value="default">列表视图</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Header>
                <Content style={{padding: '0 16px'}}>
                    <div style={{minHeight: 360}}>
                        <Card>
                            <Calendar/>
                        </Card>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Chrome by airycanon
                </Footer>
            </Layout>
        );
    }
}
