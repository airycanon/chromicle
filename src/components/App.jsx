import React, {Component} from 'react';
import '../assets/less/index.less';
import {Row, Col, Calendar} from 'antd';
import HistoryList from './HistoryList';
import PropTypes from 'prop-types';

export default class App extends Component {

    render() {
        const {store} = this.props;
        return (
            <Row gutter={16}>
                <Col span={18} push={6}><HistoryList historyStore={store}/></Col>
                <Col span={6} pull={18}><Calendar /></Col>
            </Row>
        );
    }
}

App.propTypes = {
    store: PropTypes.object
}
