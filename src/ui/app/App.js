import React from 'react';
import style from './App.scss';
import Todos from './components/Todos.js';
import CreateTodo from './components/CreateTodo.js';

export default class App extends React.Component {
	render() {
	    return (
	        <div className={style.main}>
	        	<div className={style.upper_cont}>
	        		<CreateTodo socket={this.props.socket}/>
	        	</div>
	        	<div className={style.lower_cont}>
	        		<Todos socket={this.props.socket}/>
	        	</div>
	        </div>
	    );
	}
}

