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

    query = {}

    @action
    async setRange(start, end) {
        this.query.start = start;
        this.query.end = end;
        await this.getHistories();
    }

    @action
    async setText(text) {
        this.query.text = text;
        await this.getHistories();
    }

    async getHistories() {
        let historyItems = await historyService.get(this.query);

        this.ranges = [];
        this.rangeKeys = {};

        for (let historyItem of historyItems) {
            let key = moment(historyItem.lastVisitTime).format('YYYY-MM-DD HH:mm');
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

    @action
    async remove(range, history = null) {
        if (history) {
            await historyService.delete(history.url);
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

    async init() {
        this.query = {
            start: moment().startOf('day'),
            end: moment().endOf('day'),
            text: ''
        }

        return await this.getHistories();
    }
}