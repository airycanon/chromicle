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
}

let service = new BookmarkService();

export default service;
