import React, {Component} from 'react';
import {PropTypes, observer} from "mobx-react";
import HistoryItem from "./HistoryItem";

@observer
export default class TodoList extends Component {

    render() {
        const {historyStore} = this.props;

        return (
            <div>
                <ul>
                    {historyStore.histories.map(history => (
                        <HistoryItem history={history} key={history.id}/>
                    ))}
                </ul>
            </div>
        );
    }
}

TodoList.propTypes = {
    historyStore: PropTypes.objectOrObservableObject
}