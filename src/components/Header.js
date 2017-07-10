import React, {Component} from 'react';
import {Layout, Input, Row, Col, DatePicker} from 'antd';
import {inject} from 'mobx-react';

@inject('store')
export default class Header extends Component {
    render() {
        const {Header} = Layout;
        return (<Header>
            <Row>
                <Col span={6} offset={6}>
                    <DatePicker.RangePicker onChange={this.onChange.bind(this)}/>
                </Col>
                <Col className="search-col" span={6}>
                    <div className="logo"/>
                    <Input.Search placeholder="搜索历史记录" onSearch={this.onSearch.bind(this)}/>
                </Col>
            </Row>
        </Header>)
    }

    onChange(date, dateString) {
        const {store} = this.props;
        store.setRange(date[0], date[1]);
    }

    onSearch(value) {
        const {store} = this.props;
        store.setText(value);
    }
}

