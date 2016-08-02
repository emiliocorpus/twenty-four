import React from 'react';
import _ from 'lodash';

export default class Dice extends React.Component{
	constructor(props) {
	  super(props);


	  _.bindAll(this, ['handleToggleSelect', 'handleDiceType'])

	  if (this.props.selectable) {
	  	this.state = {
	  		selected: false,
	  		displayedClasses: "dice"
	  	}
	  }
	}


	handleToggleSelect(){
		if (!this.state.selected) {
			this.props.handleSelectDie(this)
			this.setState({
				selected: true,
				displayedClasses: "dice dice-selected"
			})
		}
		else {
			this.props.handleRemoveDie(this)
			this.setState({
				selected:false,
				displayedClasses: "dice"
			})
		}
			

	}

	handleDiceType() {
		if(this.props.selectable) {
			return (
				<div className={this.state.displayedClasses} onClick={this.handleToggleSelect}>
					{this.props.value}
				</div>
			)
		}
		else {
			return (
				<div className="dice">
					{this.props.value}
				</div>
			)
		}
	}

	render() {
		return this.handleDiceType()
	}
}