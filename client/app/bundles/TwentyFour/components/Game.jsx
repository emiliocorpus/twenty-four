import React from 'react';
import FlipMove from 'react-flip-move';
import Dice from './Dice';
import RolledDice from './RolledDice';
import ToBeRolled from './ToBeRolled';
import _ from 'lodash';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Game';

        this.state = {
        	keptDice: [],
        	toBeRolledDice: [],
        	lastRoll:[],
        	selectedDie:[]
        }

        this.selectDie = this.selectDie.bind(this)
        this.removeFromSelected = this.removeFromSelected.bind(this)
        this.submitSelectedDie = this.submitSelectedDie.bind(this)
    }

    selectDie(die) {
    	var selected = this.state.selectedDie
    	selected.push(die);
    	this.setState({
    		selectedDie: selected
    	})
    }

    removeFromSelected(die) {
    	var index = this.state.selectedDie.indexOf(die)
    	var updatedSelected =  React.addons.update(this.state.selectedDie, {$splice: [[index,1]]})
    	this.setState({
    		selectedDie: updatedSelected
    	})
    }



    submitSelectedDie(e){
    	e.preventDefault();
    	var selected = this.state.selectedDie
    	var kept = this.state.keptDice
    	for (var i = 0; i < selected.length;i++) {
    		kept.push(selected[i])
    	}
    	if (selected.length != 0) {
    		this.setState({
	    		keptDice: kept,
	    		selectedDie:[],
	    		toBeRolledDice: []

	    	})
    	}
		    	
    }


    handleRoll(e) {
    	e.preventDefault();
    	var values = []
    	for (var i = 0; i < 6 - this.state.keptDice.length; i++) {
    		var value = Math.floor((Math.random() * 6) + 1);
    		values.push(value)
    	}
    	this.setState({
    		lastRoll: values,
    		toBeRolledDice: values
    	})
    }

    render() {
        return (
        	<div className="col-lg-12 debugger-green">
	        	<div className="row">
	        		<RolledDice dice={this.state.keptDice}/>
	        		<ToBeRolled dice={this.state.toBeRolledDice} handleSelectDie={this.selectDie} handleRemoveFromSelected={this.removeFromSelected}/> 
	        		<button onClick={this.handleRoll.bind(this)}>
	        			Roll
	        		</button>
	        		<button onClick={this.submitSelectedDie}>
	        			Select
	        		</button>
	        	</div>
	        </div>
        )
    }
}



