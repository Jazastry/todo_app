import React from 'react';
import style from './Todos.scss';

export default class Todos extends React.Component {
  constructor(pr) {
    super(pr);

    this.state = {
      todos: []
    };
  }
  componentDidMount() {
    this.props.socket.subscribe('todos.create', (todos) => {
      this.setState({ ...this.state, todos })
    })
    this.props.socket.subscribe('todo.create', (todo) => {
      let state = { ...this.state };
      state.todos.push(todo)
      this.setState(state)
    })
    this.props.socket.subscribe('todo.delete', (id) => {
      let state = { ...this.state };
      state.todos = state.todos.filter((el) => { return el.id !== id;});
      this.setState(state)
    })
  }
  handleDeleteTodoClick(el, e) {
    e.preventDefault();
    this.props.socket.emit('todo.delete', el.id);
  }
  render() {
    return (
      <div className={style.main}>
      	{this.state.todos.map((el, i) => {
      		return <div className={style.todo} key={i}>
      			<span className="name">{el.name}</span>
      			<span className="description">{el.description}</span>
      			<span className="fa fa-times"
      				onClick={this.handleDeleteTodoClick.bind(this, el)}></span>
      		</div>;
      	})}
      </div>
    );
  }
}
