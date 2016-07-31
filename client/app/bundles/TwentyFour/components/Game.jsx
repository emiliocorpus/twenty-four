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
        	selectedDie:[],
        	totalScore: 0
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
    	var selected = []
    	for (var i=0; i < this.state.selectedDie.length; i ++) {
    		selected.push(this.state.selectedDie[i])
    	}
    	var updatedSelected = selected.filter(function(item){
    		if (item != die) {
    			return item
    		}
    	})
    	this.setState({
    		selectedDie: updatedSelected
    	})
    }

    countScore(keptDice) {
    	var fours = 0
    	var twos = 0
    	var totalScore = 0
    	for (var i=0; i < keptDice.length; i++ ) {
    		totalScore += keptDice[i].props.value
    		if (keptDice[i].props.value === 2) {
    			twos ++
    		}
    		else if (keptDice[i].props.value == 4) {
    			fours ++
    		}
    	}

    	if (fours > 0) {
    		debugger
    		totalScore -= 4
    	}
    	if (twos >0) {
    		debugger
    		totalScore -= 2
    	}
    	if ( fours + twos === 0) {
    		debugger
    		totalScore = 0
    	}
    	debugger
    	return totalScore
    }

    submitSelectedDie(e){
    	e.preventDefault();
    	var selected = this.state.selectedDie
    	var kept = this.state.keptDice
    	for (var i = 0; i < selected.length;i++) {
    		kept.push(selected[i])
    	}
    	debugger

    	var score = this.countScore(kept)
    	debugger
    	if (selected.length != 0) {
    		this.setState({
	    		keptDice: kept,
	    		selectedDie:[],
	    		toBeRolledDice: [],
	    		lastRoll:[],
	    		totalScore: score
	    	})
    	}
    }

    handleRoll(e) {
    	e.preventDefault();
    	if (this.state.lastRoll.length == 0 ) {
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
    }

    render() {
        return (
        	<div className="col-lg-12 debugger-green">
	        	<div className="row">
	        		<div className="col-lg-4">
	        			{this.state.totalScore}
	        		</div>
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



