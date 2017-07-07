import React, {Component} from 'react';
import {Layout, Input, Row, Col} from 'antd';
import {inject} from 'mobx-react';

@inject('store')
export default class Header extends Component {
    render() {
        const {Header} = Layout;
        return (<Header>
            <Row>
                <Col span={12} offset={6} style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <div className="logo"/>
                    <Input.Search placeholder="搜索历史记录" style={{width: 200, marginLeft: 'auto'}} onSearch={this.onSearch.bind(this)}/>
                </Col>
            </Row>
        </Header>)
    }

    onSearch(value) {
        const {store} = this.props;
        store.setText(value);
    }
}

