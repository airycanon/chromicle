import {observable, action, computed} from 'mobx';
import bookmarkService from '../service/BookmarkService';

class Bookmark {
    title = '';
    id = '';
    url = '';
    index = ''
    parentId = '';
    children = [];

    constructor(bookmarkObject) {
        Object.assign(this, bookmarkObject);
    }
}

class BookmarkStore {
    @observable nodes = [];

    @action
    async select(node) {
        let nodes = await bookmarkService.getFolder(node.id);
        this.nodes = await Promise.all(nodes.map(async (item) => {
            let bookmark = new Bookmark(item);
            bookmark.children = await bookmarkService.getFolder(bookmark.id);
            return bookmark;
        }));
    }

    @action
    async add(history, bookmark) {
        if (history.bookmark) {
            bookmarkService.move(history.bookmark.id, bookmark.id);
        } else {
            const data = {
                title: history.title,
                url: history.url,
                parentId: bookmark.id
            }
            history.bookmark  = await bookmarkService.create(data);
        }
    }

    @action
    async move(bookmark, parent) {
        bookmarkService.move(bookmark.id, parent.id);
    }
}

let bookmarkStore = new BookmarkStore();

export default bookmarkStore;