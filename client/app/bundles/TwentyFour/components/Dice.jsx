import React from 'react';
import _ from 'lodash';

export default class Dice extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	value: this.props.value
	  }
	}

	render() {
		return (
			<div>
				This is {this.state.value} dice.
			</div>
		);
	}
}