import {observable, action, computed} from 'mobx';
import historyStore from './HistoryStore';

class ViewStore {
    @observable checkedHistories = [];

    @observable bookmarkHistory = null;

    @observable breadcrumbs = [];

    @computed
    get hasChecked() {
        return this.checkedHistories.length > 0;
    }

    @action
    cancelChecked() {
        for (let history of this.checkedHistories) {
            history.checked = false;
        }

        this.checkedHistories = [];
    }

    @action
    addChecked(history) {
        this.checkedHistories.push(history);
    }

    @action
    async removeChecked() {
        for (let history of this.checkedHistories) {
            await historyStore.removeHistory(history);
        }

        this.checkedHistories = [];
    }

    @action
    addBreadcrumb(node) {
        this.breadcrumbs.push(node);
    }

    @action
    changeBreadcrumb(index) {
        this.breadcrumbs.splice(index + 1);
    }
}

let viewStore = new ViewStore();
export default viewStore;