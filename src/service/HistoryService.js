class HistoryService {

    query = {};

    text(text) {
        this.query.text = text;

        return this;
    }

    range(start, end) {
        this.query.startTime = start.valueOf();
        this.query.endTime = end.valueOf();

        return this;
    }

    async get(page = 1, pageSize = 20) {
        let total = page * pageSize;
        this.query.maxResults = total;

        return new Promise((resolve) => {
            chrome.history.search(this.query, historyItems => {
                    resolve(historyItems.slice(total - pageSize, total));
                }
            );
        });
    }

    async remove(url) {
        return new Promise((resolve) => {
            chrome.history.deleteUrl({url}, () => {
                resolve();
            });
        });
    }
}

let service = new HistoryService();

export default service;
