import React from 'react';
import ReactDOM from 'react-dom';
import HistoryList from './components/HistoryList';
import HistoryStore from './stores/HistoryStore';
import {Row, Col, Calendar, LocaleProvider} from 'antd';
import zhTW from 'antd/lib/locale-provider/zh_TW';
import 'antd/dist/antd.css';

const store = new HistoryStore();
store.getHistories();

ReactDOM.render(
    <LocaleProvider locale={zhTW}>
        <Row gutter={16}>
            <Col span={18} push={6}><HistoryList historyStore={store}/></Col>
            <Col span={6} pull={18}><Calendar /></Col>
        </Row>
    </LocaleProvider>,
    document.getElementById('app')
);