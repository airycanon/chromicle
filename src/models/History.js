import {observable} from 'mobx';

export default class History {
    @observable title;

    id

    url

    lastVisitTime


    visitCount


    typedCount

    constructor(historyObject) {
        Object.assign(this,historyObject)
    }
}