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
        	game: 'choosing',
        	numOfPlayers: 0,
        	numOfComputers: 0,
        	currentPlayerTurn:0,
        	scores: [],
        	scoreToBeat: "--",
        	keptDice: [],
        	toBeRolledDice: [],
        	lastRoll:[],
        	selectedDie:[],
        	totalScore: 0
        }

        this.selectDie = this.selectDie.bind(this)
        this.removeFromSelected = this.removeFromSelected.bind(this)
        this.submitSelectedDie = this.submitSelectedDie.bind(this)
        this.choosePlayers = this.choosePlayers.bind(this)
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
    		totalScore -= 4
    	}
    	if (twos > 0) {
    		totalScore -= 2
    	}
    	if ( fours === 0 || twos === 0) {
    		totalScore = 0
    	}
    	return totalScore
    }


    calculatMinScoreToBeat(scores) {
    	var minScore = scores[0]
    	for (var i=0;i<scores.length; i++) {
    		if (scores[i] < minScore) {
    			minScore = scores[i]
    		}
    	}
    	return minScore
    }

    submitSelectedDie(e){
    	e.preventDefault();
    	var selected = this.state.selectedDie
    	var kept = this.state.keptDice
    	for (var i = 0; i < selected.length;i++) {
    		kept.push(selected[i])
    	}
    	var scores = this.state.scores
    	var score = this.countScore(kept)
    	scores.push(score)

    	if (selected.length != 0) {
    		if (kept.length == 6) {
    			var scoreToBeat = this.calculatMinScoreToBeat(scores)
    			var turn = this.state.currentPlayerTurn + 1
    			this.setState({
    				currentPlayerTurn: turn,
    				scoreToBeat: scoreToBeat,
		    		keptDice: [],
		    		scores: scores,
		    		selectedDie:[],
		    		toBeRolledDice: [],
		    		lastRoll:[],
		    		totalScore: 0
		    	})
		    	if (this.state.scores.length === this.state.numOfPlayers) {
		    		this.setState({
		    			game: "over"
		    		})
		    	}
    		}
    		else {
    			this.setState({
		    		keptDice: kept,
		    		scores: scores,
		    		selectedDie:[],
		    		toBeRolledDice: [],
		    		lastRoll:[],
		    		totalScore: score
		    	})
    		}
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

    choosePlayers(e) {
    	e.preventDefault()
    	this.setState({
    		game: "active",
    		numOfPlayers: parseInt(e.target.children[1].value),
    		numOfComputers: parseInt(e.target.children[3].value),
    	})


    }

    render() {
    	if (this.state.game === "choosing") {
    		return (
    			<div className="col-lg-12 debugger-green">
    				<form onSubmit={this.choosePlayers}>

    			      <span>Players: </span>
    				  <select name="total_players">
    				    <option value="2">2</option>
    				    <option value="3">3</option>
    				    <option value="4">4</option>
    				    <option value="5">5</option>
    				  </select>
    				  &nbsp;&nbsp;

    				  <span>Number of Computers: </span>
    				  <select name="total_computers">
    				    <option value='0'>0</option>
    				    <option value="1">1</option>
    				    <option value="2">2</option>
    				    <option value="3">3</option>
    				    <option value="4">4</option>
    				  </select>
    				  <br/><br/>

    				  <input type="submit"/>
    				</form>
    			</div>
    		)
    	}
    	else {
	        return (
	        	<div className="col-lg-12 debugger-red">
		        	<div className="row">
		        		<div className="well">
		        			<div className="col-lg-4">
			        			<p>Total Score</p>
			        			{this.state.totalScore}
			        		</div>

			        		<div className="col-lg-4">
			        			<p>Current Turn</p>
			        			Player {this.state.currentPlayerTurn + 1}
			        		</div>

			        		<div className="col-lg-4">
			        			<p>Score To Beat</p>
			        			{this.state.scoreToBeat}
			        		</div>



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
}



