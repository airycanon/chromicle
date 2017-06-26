import React,{Component} from 'react';
import {PropTypes,observer} from "mobx-react";

@observer
export default class TodoView extends Component {
    render() {
        const {todo} = this.props;
        return (<li>
            <input
                type="checkbox"
                checked={todo.finished}
                onClick={() => (todo.finished = !todo.finished)}
            />
            {todo.title}
        </li>);
    }
}

TodoView.propTypes = {
    todo: PropTypes.observableObject
}