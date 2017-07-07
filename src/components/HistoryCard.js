import React, {Component} from 'react';
import {Card, Row} from 'antd';
import PropTypes from 'prop-types';
import HistoryMenu from './HistoryMenu';
import HistoryItem from './HistoryItem';
import {inject, observer} from "mobx-react";

@inject('store')
@observer
export default class HistoryCard extends Component {

    render() {
        const {range} = this.props;
        return (<Card className="history-card" title={range.key} extra={<HistoryMenu click={this.onMenuClick.bind(this)}/>}>
            {
                range.histories.map(history => (<HistoryItem key={history.id} range={range} history={history}/>))
            }
        </Card>)
    }

    onMenuClick(key) {
        const {store, range} = this.props;
        store.remove(range);
    }
}

HistoryCard.propTypes = {
    range: PropTypes.object.isRequired
};
