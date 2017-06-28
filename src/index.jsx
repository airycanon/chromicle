import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import HistoryStore from './stores/HistoryStore';

const store = new HistoryStore();
store.getHistories();

ReactDOM.render(<App store={store}/>, document.getElementById('app'));
