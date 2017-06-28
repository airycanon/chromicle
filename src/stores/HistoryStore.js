import {observable,computed} from 'mobx';
import History from '../models/History';

export default class HistoryStore {
    @observable histories = [];

    getHistories () {
        const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
        const numRequestsOutstanding = 0;
        chrome.history.search({
                'text': '',              // Return every history item....
                'startTime': oneWeekAgo  // that was accessed less than one week ago.
            },
            historyItems => {
                for (let historyItem of historyItems) {
                    this.histories.push(new History(historyItem));
                }
            });
    }
}