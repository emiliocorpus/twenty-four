import React from 'react';
import _ from 'lodash';

export default class Dice extends React.Component{
	constructor(props) {
	  super(props);

	}

	render() {

		return (
			<div className="dice">
				{this.props.value}
			</div>
		);
	}
}