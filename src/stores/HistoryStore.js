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
    key = ''
    histories = [];

    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.key = start.format('YYYY-MM-DD HH:mm')
    }
}

export default class HistoryStore {
    @observable ranges = {};

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

        let ranges = {};
        for (let historyItem of historyItems) {
            let minute = moment(historyItem.lastVisitTime);
            let range = new TimeRange(minute.startOf('minute'), minute.endOf('minute'));
            if (!ranges[range.key]) {
                ranges[range.key] = [];
            }
            ranges[range.key].push(new History(historyItem));
            this.ranges = ranges;
            console.log(this.ranges);
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