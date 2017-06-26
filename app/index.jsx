import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable,computed} from 'mobx';
import {PropTypes,observer} from "mobx-react";
import Todo from './store/Todo'
import TodoView from './components/Todo'


class TodoList {
    @observable todos = [];

    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

@observer
class TodoListView extends Component {

    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo => (
                        <TodoView todo={todo} key={todo.id}/>
                    ))}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        );
    }
}

TodoListView.propTypes = {
    todoList: PropTypes.objectOrObservableObject
}

const store = new TodoList();

ReactDOM.render(<TodoListView todoList={store}/>, document.getElementById('app'));

store.todos.push(new Todo('Get Coffee'), new Todo('Write simpler code'));
store.todos[0].finished = true;

window.store = store;