import React from 'react';
import style from './App.scss';

export default class App extends React.Component {
	render() {
	    return (
	        <div className={style.app}>
	        	<p>App P</p>
	        	<div>
	        		<p>DIV P</p>
	        	</div>
	        </div>
	    );
	}
}

