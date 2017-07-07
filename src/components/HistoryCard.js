import React, {Component} from 'react';
import {Card, Row} from 'antd';
import PropTypes from 'prop-types';
import HistoryMenu from './HistoryMenu';
import HistoryItem from './HistoryItem';

export default class HistoryCard extends Component {

    render() {
        const {range, title} = this.props;
        return (<Card className="history-card" title={title} extra={<HistoryMenu />}>
            {
                range.histories.map(history => (<HistoryItem key={history.id} history={history}/>))
            }
        </Card>)
    }
}

HistoryCard.propTypes = {
    range: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};
