import React from 'react';
import style from './CreateTodo.scss';

export default class CreateTodo extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      name: "",
      description: ""
    };
  }
  handleInputChange(e) {
    let state = { ...this.state };
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.socket.emit('todo.create', this.state)
  }
  render() {
    return (
      <form className={style.main} onSubmit={this.handleSubmit.bind(this)}>
        <div className={style.label_cont}>
          <label>Create todo</label>
        </div>
      	<div className={style.line_cont}>
      		<label>Name</label>
      		<input className="name_input"
      			name="name" type="text"
      			value={this.state.name}
      			onChange={this.handleInputChange.bind(this)}
            autoComplete="off"/>
      	</div>
      	<div className={style.line_cont}>
      		<label>Description</label>
      		<input className="name_input"
    		 		name="description" type="text"
        		value={this.state.description}
        		onChange={this.handleInputChange.bind(this)}
            autoComplete="off"/>
      	</div>
      	<div className={style.btn_cont}>
      		<button type="submit">Create</button>
      	</div>
      </form>
    );
  }
}
