import React from 'react';
import _ from 'lodash';

export default class Dice extends React.Component{
	constructor(props) {
	  super(props);

	  this.toggleSelectDie = this.toggleSelectDie.bind(this)
	  this.state = {
	  	value: this.props.value,
	  	select: false
	  }
	}

	toggleSelectDie(e) {
		console.log("selecting")
		if (this.props.selectable) {
			this.setState({
				select: (!this.state.select)
			})
			this.handleToggleDie(this)
		}
		else {
			console.log('unselectable')
		}

	}

	handleToggleDie(dice) {
		if (this.state.select) {
			this.props.removeFromSelected(dice)
		}
		else {
			this.props.selectDie(dice)
		}
	}

	render() {
		var classDisplay = "dice";
		if (this.state.select) {
			classDisplay = "dice dice-selected"
		}
		return (
			<div className={classDisplay} onClick={this.toggleSelectDie}>
				{this.state.value}
			</div>
		);
	}
}