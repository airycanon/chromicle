class BookmarkService {

    async getFolder(id) {
        return new Promise((resolve) => {
            chrome.bookmarks.getChildren(id, bookmarkItems => {
                resolve(bookmarkItems.filter(bookmarkItem => {
                    return bookmarkItem.url === undefined;
                }));
            });
        });
    }

    async create(bookmark) {
        return new Promise((resolve) => {
            chrome.bookmarks.create(bookmark, result => {
                resolve(result);
            })
        });
    }

    async search(url) {
        return new Promise((resolve) => {
            chrome.bookmarks.search({url}, result => {
                let bookmark = result.length ? result[0] : null
                resolve(bookmark);
            })
        });
    }

    move(id, parentId) {
        chrome.bookmarks.move(id, {parentId});
    }
}

let service = new BookmarkService();

export default service;
