import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import HistoryStore from './stores/HistoryStore';

let store = new HistoryStore();
store.init();

ReactDOM.render(<App store={store}/>, document.getElementById('app'));
