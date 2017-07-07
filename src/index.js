import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import HistoryStore from './stores/HistoryStore';
import {Provider} from 'mobx-react';

let store = new HistoryStore();
store.init();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
