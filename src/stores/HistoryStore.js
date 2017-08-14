import {observable, action, computed} from 'mobx';
import historyService from '../service/HistoryService';
import moment from 'moment';

class History {
    title = '';
    id = '';
    url = '';
    lastVisitTime = '';
    visitCount = 0;
    typedCount = 0;

    constructor(historyObject) {
        Object.assign(this, historyObject);
        this.lastVisitTime = moment(this.lastVisitTime);
        this.title = this.title || this.url;
    }
}

class TimeRange {
    @observable histories = [];
    historiesMap = {};
    key

    constructor(key) {
        this.key = key;
    }

    add(history) {
        if (this.historiesMap[history.id] === undefined) {
            this.histories.push(history);
            this.historiesMap[history.id] = this.histories.length - 1;
        }
    }

    remove(history) {
        let index = this.historiesMap[history.id];
        this.histories.remove(history);
    }

    removeAll() {
        this.histories = [];
        this.historiesMap = {};
    }
}

export default class HistoryStore {
    @observable ranges = [];
    rangeKeys = {};
    page = 1;

    @action
    async init() {
        let end = moment().endOf('day');
        let start = moment().subtract(90, 'days').startOf('day');
        let items = await historyService.text('').range(start, end).get();
        this.add(items);
    }

    @action
    async setRange(start, end) {
        let items = await historyService.range(start.startOf('day'), end.endOf('day')).get();
        this.clear();
        this.add(items);
    }

    @action
    async setText(text) {
        let items = await historyService.text(text).get();
        this.add(items);
    }

    @action
    async more() {
        this.page++;
        let items = await historyService.get(this.page);
        this.add(items);
    }

    @action
    async remove(range, history = null) {
        if (history) {
            await historyService.remove(history.url);
            range.remove(history);
            if (!range.histories.length) {
                this.removeRange(range);
            }
        } else {
            for (let history of range.histories) {
                await historyService.remove(history.url);
            }
            range.removeAll();
            this.removeRange(range)
        }
    }

    clear() {
        this.rangeKeys = {};
        this.ranges = [];
    }

    add(historyItems) {
        for (let historyItem of historyItems) {
            let time = moment(historyItem.lastVisitTime);

            let key = time.format('YYYY-MM-DD HH:mm');
            let range;
            if (this.rangeKeys[key] === undefined) {
                range = new TimeRange(key);
                this.ranges.push(range);
                this.rangeKeys[key] = this.ranges.length - 1;
            } else {
                range = this.ranges[this.rangeKeys[key]];
            }
            range.add(new History(historyItem));
        }
    }

    removeRange(range) {
        let index = this.rangeKeys[range.key];
        this.ranges.remove(range);
        delete this.rangeKeys[range.key]
    }
}