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
    }

    // FUNCTION THAT CLONES OBJECT
	makeClone(obj) {
	    var copy;
	        // Handle the 3 simple types, and null or undefined
	        if (null == obj || "object" != typeof obj) return obj;
	        // Handle Array
	        if (obj instanceof Array) {
	            copy = [];
	            for (var i = 0, len = obj.length; i < len; i++) {
	                copy[i] = this.makeClone(obj[i]);
	            }
	            return copy;
	        }
	        // Handle Object
	        if (obj instanceof Object) {
	            copy = {};
	            for (var attr in obj) {
	                if (obj.hasOwnProperty(attr)) copy[attr] = this.makeClone(obj[attr]);
	            }
	            return copy;
	        }

	        throw new Error("Unable to copy obj! Its type isn't supported.");
	}

    selectDie(die) {
    	e.preventDefault();
    	var selected = this.makeClone(this.state.selectedDie);
    	selected.push(die);
    	this.setState({
    		selectedDie: selected
    	});
    }

    submitSelectedDie(e){
    	e.preventDefault();
    	var selected = this.makeClone(this.state.selectedDie);
    	this.setState({
    		keptDice: selected
    	})
    }


    handleRoll(e) {
    	e.preventDefault();
    	var values = []
    	for (var i = 0; i <= 6 - this.state.keptDice.length; i++) {
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
	        		<RolledDice dice={this.state.rolledDice}/>
	        		<ToBeRolled dice={this.state.toBeRolledDice} handleSelectDie={this.selectDie.bind(this)}/> 
	        		<button onClick={this.handleRoll.bind(this)}>
	        			Roll
	        		</button>
	        		<button onClick={this.submitSelectedDie.bind(this)}>
	        			Select
	        		</button>
	        	</div>
	        </div>
        )
    }
}



