import React, {Component} from 'react';
import {PropTypes, observer} from "mobx-react";

@observer
export default class HistoryItem extends Component {
    render() {
        const {history} = this.props;
        const title = history.title ? history.title : history.url
        return (<li>
            <a href={history.url}>{title}</a>
        </li>);
    }
}

HistoryItem.propTypes = {
    history: PropTypes.observableObject
}