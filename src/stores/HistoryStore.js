import {observable, action, computed} from 'mobx';
import historyService from '../service/HistoryService';
import moment from 'moment';

class History {
    title = '';
    id = '';
    url = '';
    rangeKey = '';
    lastVisitTime = '';
    visitCount = 0;
    typedCount = 0;
    @observable checked = false;

    constructor(historyObject) {
        Object.assign(this, historyObject);
        this.lastVisitTime = moment(this.lastVisitTime);
        this.rangeKey = this.lastVisitTime.format('YYYY-MM-DD HH:mm');
        this.title = this.title || this.url;
    }

    async remove() {
        await historyService.remove(this.url);
    }
}

class TimeRange {
    @observable histories = [];
    historiesMap = {};
    key;

    constructor(key) {
        this.key = key;
    }

    add(history) {
        if (this.historiesMap[history.id] === undefined) {
            this.histories.push(history);
            this.historiesMap[history.id] = history;
        }
    }

    async remove(history) {
        if (this.histories.remove(history)) {
            await history.remove();
            delete this.historiesMap[history.id];
        }
    }

    async removeAll() {
        for (let history of this.histories) {
            await history.remove();
        }

        this.histories = [];
        this.historiesMap = {};
    }
}

class HistoryStore {
    @observable ranges = [];
    rangeMaps = {};
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
        this.clear();
        this.add(items);
    }

    @action
    async more() {
        this.page++;
        let items = await historyService.get(this.page);
        this.add(items);
    }

    @action
    async removeRange(range) {
        if (this.ranges.remove(range)) {
            await range.removeAll();
            delete this.rangeMaps[range.key]
        }
    }

    @action
    async removeHistory(history) {
        let range = this.getRange(history.rangeKey);
        await range.remove(history);
        if (!range.histories.length) {
            await this.removeRange(range);
        }
    }

    clear() {
        this.rangeMaps = {};
        this.ranges = [];
    }

    add(historyItems) {
        for (let historyItem of historyItems) {
            let history = new History(historyItem);
            let range = this.getRange(history.rangeKey);
            range.add(history);
        }
    }

    getRange(key) {
        let range;
        if (this.rangeMaps[key] === undefined) {
            range = new TimeRange(key);
            this.ranges.push(range);
            this.rangeMaps[key] = range;
        } else {
            range = this.rangeMaps[key];
        }

        return range;
    }
}

let historyStore = new HistoryStore();
historyStore.init();

export default historyStore;