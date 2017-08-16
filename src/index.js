import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import historyStore from './stores/HistoryStore';
import viewStore from './stores/ViewStore';
import {Provider} from 'mobx-react';

ReactDOM.render(
    <Provider historyStore={historyStore} viewStore={viewStore}>
        <App />
    </Provider>,
    document.getElementById('app')
);
