import React, {Component} from 'react';
import {Layout, Input, Row, Col, DatePicker, Button, Affix} from 'antd';
import {inject, observer} from 'mobx-react';

@inject('historyStore', 'viewStore')
@observer
export default class Header extends Component {
    render() {
        const {Header} = Layout;
        const {viewStore} = this.props;

        let headerLeft, headerRight;
        if (viewStore.hasChecked) {
            headerLeft = <Col span={6} offset={6}>
                <span className="header-selected-info">已选择 {viewStore.checkedHistories.length} 项</span>
            </Col>;
            headerRight = <Col span={6} className="header-right col-right">
                <Col span={6}>
                    <Button ghost onClick={this.onCancel.bind(this)}>取消</Button>
                </Col>
                <Col>
                    <Button type="danger" onClick={this.onRemove.bind(this)} ghost>删除</Button>
                </Col>
            </Col>;
        } else {
            headerLeft = <Col span={6} offset={6}>
                <DatePicker.RangePicker onChange={this.onChange.bind(this)}/>
            </Col>;
            headerRight = <Col className="header-right col-right" span={6}>
                <Input.Search placeholder="搜索历史记录" onSearch={this.onSearch.bind(this)}/>
            </Col>
        }

        return (<Header>
            <Affix>
                <Row className="header-row" style={{}}>{headerLeft}{headerRight}</Row>
            </Affix>
        </Header>);
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

