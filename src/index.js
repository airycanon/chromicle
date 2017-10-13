import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import historyStore from './stores/HistoryStore';
import viewStore from './stores/ViewStore';
import bookmarkStore from './stores/BookmarkStore';
import {Provider} from 'mobx-react';

const stores = {
    historyStore,
    viewStore,
    bookmarkStore
}

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('app')
);
