import {observable, action, computed} from 'mobx';
import historyStore from './HistoryStore';

class ViewStore {
    @observable selectedHistories = [];

    @computed
    get hasSelected() {
        return this.selectedHistories.length > 0;
    }

    @action
    cancelChecked() {
        for (let history of this.selectedHistories) {
            history.checked = false;
        }

        this.selectedHistories = [];
    }

    @action
    async removeChecked() {
        for (let history of this.selectedHistories) {
            await historyStore.removeHistory(history);
        }

        this.selectedHistories = [];
    }
}

let viewStore = new ViewStore();
export default viewStore;