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
        const {store, range} = this.props;

        const menu = <HistoryMenu click={() => {
            store.remove(range);
        }}/>;

        return (<Card className="history-card" title={range.key} extra={menu}>
            {
                range.histories.map(history => (<HistoryItem key={history.id} range={range} history={history}/>))
            }
        </Card>)
    }
}

HistoryCard.propTypes = {
    range: PropTypes.object.isRequired
};
