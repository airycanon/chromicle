import React, {Component} from 'react';
import {Layout, Input, Row, Col, DatePicker, Button, Affix} from 'antd';
import {inject, observer} from 'mobx-react';

@inject('historyStore', 'viewStore')
@observer
export default class Header extends Component {
    render() {
        const {Header} = Layout;
        const {viewStore} = this.props;
        if (!viewStore.hasSelected) {
            return (<Affix>
                <Header>
                    <Row>
                        <Col span={6} offset={6}>
                            <DatePicker.RangePicker onChange={this.onChange.bind(this)}/>
                        </Col>
                        <Col className="header-right" span={6}>
                            <div className="logo"/>
                            <Input.Search placeholder="搜索历史记录" onSearch={this.onSearch.bind(this)}/>
                        </Col>
                    </Row>
                </Header></Affix>)
        } else {
            return (<Affix><Header>
                <Row>
                    <Col span={6} offset={6}>
                        <span style={{color: '#aaa', fontSize: 14}}>已选择 {viewStore.selectedHistories.length} 项</span>
                    </Col>
                    <Col span={6} className="header-right">
                        <Col span={6}>
                            <Button ghost onClick={this.onCancel.bind(this)}>取消</Button>
                        </Col>
                        <Col>
                            <Button type="danger" onClick={this.onRemove.bind(this)} ghost>删除</Button>
                        </Col>
                    </Col>
                </Row>
            </Header></Affix>)
        }
    }

    onChange(date, dateString) {
        const {historyStore} = this.props;
        historyStore.setRange(date[0], date[1]);
    }

    onSearch(value) {
        const {historyStore} = this.props;
        historyStore.setText(value);
    }

    onCancel() {
        const {viewStore} = this.props;
        viewStore.cancelChecked();
    }

    onRemove() {
        const {viewStore} = this.props;
        viewStore.removeChecked();
    }
}

