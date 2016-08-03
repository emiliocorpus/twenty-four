import React from 'react';
import _ from 'lodash';

export default class Dice extends React.Component{
	constructor(props) {
	  super(props);


	  _.bindAll(this, ['handleToggleSelect', 'handleDiceType', 'valueCheck'])

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
				imgClass: "dice-selected"
			})
		}
		else {
			this.props.handleRemoveDie(this)
			this.setState({
				selected:false,
				imgClass:""
			})
		}
			

	}


	valueCheck(){
		var source
		switch(this.props.value){
			case 1:
				source = "assets/images/one-value(2).png"
				break
			case 2:
				source = "assets/images/two-value(2).png"
				break
			case 3:
				source = "assets/images/three-value(2).png"
				break
			case 4:
				source = "assets/images/four-value(2).png"
				break
			case 5:
				source = "assets/images/five-value(2).png"
				break
			case 6:
				source = "assets/images/six-value(2).png"
				break
		}
		return source
	}


	handleDiceType() {
		var sourceDisplay = this.valueCheck()
		if(this.props.selectable) {
			return (
				<div className="dice" onClick={this.handleToggleSelect}>
					<img src={sourceDisplay} className={this.state.imgClass}/>
				</div>
			)
		}
		else {
			return (
				<div className="dice">
					<img src={sourceDisplay}/>
				</div>
			)
		}
	}

	render() {
		return this.handleDiceType()
	}
}