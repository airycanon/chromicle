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
        console.log(this.nodes);
    }
}

let bookmarkStore = new BookmarkStore();

export default bookmarkStore;