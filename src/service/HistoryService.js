class HistoryService {
    async get({text = '', start = new Date(), end = new Date()}) {

        return new Promise((resolve) => {
            chrome.history.search(
                {
                    text: text,
                    startTime: start.valueOf(),
                    endTime: end.valueOf(),
                    maxResults: 49
                },
                historyItems => {
                    resolve(historyItems);
                }
            );
        });
    }

    async remove(url) {

        return new Promise((resolve) => {
            chrome.history.deleteUrl(
                {
                    url: url
                },
                () => {
                    resolve();
                }
            );
        });
    }
}

let service = new HistoryService();

export default service;
