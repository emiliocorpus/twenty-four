import React from 'react';
var addons = require('react-addons');
import FlipMove from 'react-flip-move';
import Dice from './Dice';
import _ from 'lodash';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Game';

        this.state = {
            currentStage: "start",
            currentTurn:0,
            totalScore:"--",
            pointInTurn:null,
            totalPlayers: 2,
            totalComputers:0,
            scores:[],
            lastRoll:[],
            keptDice:[],
            selected:[],
            computerTimeout: null,
            scoreToBeat: "--",
            helpDisplay:false,
            helpDisplayClass: "hide-lightbox"

        }

        _.bindAll(this, ['handleSubmitPlayers', 'handleSubmitComputers', 'displayDice', 'handleActivePlayer', 'handleRoll','addSelected', 'removeSelected', 'handleSubmitSelectedDice', 'calculateScore', 'handleEndGame','determineWinner','handleReset', 'displayHelp'])
    }
    // METHODS FOR CURRENTSTAGE == "start"
    handleStart() {
        console.log("You are at the start setup")
        return(
            <div>
                    <h3 className='how-to-play'><u>How To Play</u></h3>
                <p className="description">
                The game is TWENTY-FOUR, a 2 or more player game. The goal of this game is to get the highest SUM possible. The catch is you must roll AT LEAST one <img src="assets/images/two-value(2).png" className="description"/> and one <img src="assets/images/four-value(2).png" className="description"/>  for you to be able to count the rest of your roll. The highest possible roll is a <img src="assets/images/two-value(2).png" className="description"/> <img src="assets/images/four-value(2).png" className="description"/>  || <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> , which is equal to TWENTY-FOUR. If you don't roll the required <img src="assets/images/two-value(2).png" className="description"/>  & <img src="assets/images/four-value(2).png" className="description"/> , your score is ZERO. You get at most 6 total rolls, however after each roll you must keep at least ONE die. You may choose to keep a roll if you are satisfied, however stay sharp as your friend may capitalize on your mistake. Are you ready? Lets get to rollin'!  
                </p>
                <p>
                    Choose amount of players:
                </p>
                <form onSubmit={this.handleSubmitPlayers}> 
                    <select name="total-players">
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <br/><br/>
                    <input type='submit' className="btn btn-primary"/>
                </form>
            </div>
        )    
    }
    handleSubmitPlayers(e) {
        e.preventDefault()
        this.setState({
            totalPlayers: parseInt(e.target.children[0].value),
            currentStage: "active-player",
            pointInTurn: "roll"
        })
    }

    //METHODS FOR CURRENTSTAGE == "chooseComputers"
    handleChooseComputers() {
        var values =[]
        for (var i=0;i<this.state.totalPlayers;i++){
            values.push(<option value={i} key={i}>{i}</option>)
        }
        return(
            <div>
                <p>
                    Choose amount of computers:
                </p>
                <form onSubmit={this.handleSubmitComputers}> 
                    <select name="total-computers">
                      {values}
                    </select>
                    <br/><br/>
                    <input type='submit'/>
                </form>
            </div>
        )        
    }
    handleSubmitComputers(e) {
        e.preventDefault()
        this.setState({
            totalComputers: parseInt(e.target.children[0].value),
            currentStage: "active-player",
            currentTurn: 0,
            pointInTurn: "roll"
        })
    }


    //METHODS FOR AN ACTIVE PLAYER GAME
    handleActivePlayer() {
        var button
        if (this.state.pointInTurn === "roll") {
            button = <button onClick={this.handleRoll} className="btn btn-info">Roll</button>
        }
        else {
            button = <button onClick={this.handleSubmitSelectedDice} className="btn btn-danger">Select</button>
        }
        return (
            <div className="row">
                <div className="row">
                    <div className=".col-xs-6 .col-sm-4 col-md-4 bordered margin-top-5">
                        <span className="label">CURRENT TURN:</span><br/>
                        <span className="label-content">Player {this.state.currentTurn + 1}</span>
                    </div>

                    <div className=".col-xs-6 .col-sm-4 col-md-4 bordered margin-top-5">
                        <span className="label">TOTAL SCORE:</span><br/>
                        <span className="label-content">{this.state.totalScore}</span>
                    </div>

                    <div className=".col-xs-6 .col-sm-4 col-md-4 bordered margin-top-5">
                        <span className="label">SCORE TO BEAT:</span><br/>
                        <span className="label-content">{this.state.scoreToBeat}</span>
                    </div>
                </div>

                <div className="row margin-top-50">
                    <div className="row">
                        <div className="col-md-12 dice-container">
                            Kept Dice:<br/>
                            <FlipMove enterAnimation="elevator" leaveAnimation="fade">
                                {this.displayDice('kept', this.state.keptDice)}
                            </FlipMove>
                        </div>

                        <div className="col-md-12 dice-container">
                            Last Roll:<br/>
                            <FlipMove enterAnimation="elevator" leaveAnimation="fade">
                                {this.displayDice('last', this.state.lastRoll)}
                            </FlipMove>
                        </div>
                    </div>
                </div>

                {button} <sub><a href="#" onClick={this.displayHelp}>?</a></sub>
            </div>
        )
    }
    
    handleRoll(e){
        e.preventDefault()
        var values=[]
        for (var i=0;i < 6 - this.state.keptDice.length;i++) {
            values.push(Math.floor((Math.random() * 6) + 1))
        }
        this.setState({
            lastRoll: values,
            pointInTurn: "select"
        })
    }

    handleSubmitSelectedDice(e){
        e.preventDefault()
        if (this.state.selected.length !== 0) {
            var values=[]
            for (var i=0; i< this.state.selected.length;i++){
                values.push(this.state.selected[i].props.value)
            }
            var kept = this.state.keptDice.concat(values)
            var score = this.calculateScore(kept)
            var scores = this.state.scores.concat([score])
            var minScore = this.calculateMinScoreToBeat(scores)
            if (this.state.keptDice.length === 5 || kept.length === 6) {

                    if (this.state.currentTurn === this.state.totalPlayers - 1) {
                        this.setState({
                            keptDice: [],
                            selected:[],
                            lastRoll:[],
                            scores:this.state.scores.concat([score]),
                            pointInTurn:"roll",
                            currentTurn: this.state.currentTurn + 1,
                            totalScore: "--",
                            currentStage: "end",
                            scoreToBeat: minScore,
                            winners: this.determineWinner(scores)
                        })

                    }
                    else {
                        this.setState({
                            keptDice: [],
                            selected:[],
                            lastRoll:[],
                            scores:this.state.scores.concat([score]),
                            pointInTurn:"roll",
                            currentTurn: this.state.currentTurn + 1,
                            totalScore: "--",
                            scoreToBeat: minScore
                        })
                    }
            }
            else {
                this.setState({
                    keptDice: kept,
                    selected: [],
                    lastRoll:[],
                    pointInTurn: "roll",
                    totalScore:score
                })
            }
        }
    }

    calculateScore(kept){
        var fours = 0
        var twos = 0 
        var score = 0 
            for (var i=0;i<kept.length;i++) {
                if (kept[i] === 4) {
                    fours ++
                }
                if (kept[i] === 2) {
                    twos ++
                }
                score += kept[i]
            }
            if (fours >0 && twos > 0) {
                score -= 6
            }
            else {
                score = 0

            }
        return score
    }

    calculateMinScoreToBeat(scores) {
        var minScore = scores[0]
        for (var i=0; i <scores.length;i++) {
            if (scores[i] > minScore) {
                minScore = scores[i]
            }
        }
        return minScore
    }

    addSelected(dice){
        this.setState({
            selected: this.state.selected.concat([dice])
        })
    }

    removeSelected(dice){
        var index = this.state.selected.indexOf(dice)
        var newSelected = this.state.selected.splice(index,1)
        this.setState({
            selected: this.state.selected
        })
    }

    determineWinner(scores) {
        var highScore = scores[0]
        for (var i=0; i < scores.length;i++){
            if (scores[i]> highScore){
                highScore = scores[i]
            }
        }
        var ties = []
        for (var i=0; i< scores.length;i++){
            if (scores[i] === highScore) {
                ties.push(i)
            }
        }

        var winners
        if (ties.length>1) {
            winners = {ties: ties, highScore: highScore}
        }
        else {
            var indexOfWinner = scores.indexOf(highScore)
            winners = {ties: [indexOfWinner], highScore: highScore}
        }
        return winners
    }

    handleReset(e){
        e.preventDefault()
        this.setState({
            currentStage: "start",
            currentTurn:0,
            totalScore:"--",
            pointInTurn:null,
            totalPlayers: 2,
            totalComputers:0,
            scores:[],
            lastRoll:[],
            keptDice:[],
            selected:[],
            computerTimeout: null,
            scoreToBeat: "--"
        })
    }


    handleEndGame(){
        if (this.state.winners.ties.length> 1) {
            var display =[]
            for (var i=0; i< this.state.winners.ties.length;i++) {
                display.push(<span key={i}> {this.state.winners.ties[i] + 1}, </span>)

            }
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <p>Players {display} all tied with a score of {this.state.scoreToBeat}</p>

                        <button onClick={this.handleReset}> Play Again?</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <p>Player {this.state.winners.ties[0] + 1} wins with a score of {this.state.scoreToBeat}</p>


                        <button onClick={this.handleReset} className="btn btn-danger"> Play Again?</button>
                    </div>
                </div>
            )
        }
        
    }


    controlGameFlow(){
        var display
        switch(this.state.currentStage) {
            case "start":
                display = this.handleStart()
                break
            case "active-player":
                display = this.handleActivePlayer()
                break
            case "end":
                display = this.handleEndGame()
                break
            default:
                display = <p>You are at the default start setup</p>
                console.log("You are at the default start setup")
        }
        return display
    }

    displayHelp(e) {
        e.preventDefault()
        if (this.state.helpDisplay) {
            this.setState({
                helpDisplay: false,
                helpDisplayClass: "hide-lightbox"
            })
        }
        else {
            this.setState({
                helpDisplay: true,
                helpDisplayClass: "show-lightbox"
            })
        }
        
    }

    displayDice(type, dice){
        var display =[]
        switch(type) {
            case "kept":
                for (var i=0; i< dice.length;i++){
                    display.push(<Dice value={dice[i]} selectable={false} key={i} />)
                }
                break
            case "last":
                for (var i=0; i< dice.length;i++){
                    display.push(<Dice value={dice[i]} selectable={true} key={i} handleSelectDie={this.addSelected} handleRemoveDie={this.removeSelected}/>)
                }
                break
        }
        
        return display
    }

    render() {
        var display = this.controlGameFlow()
		return (
			<div className="col-md-12">
                {display}
                <div id="lightbox" className={this.state.helpDisplayClass}>
                    <p className="description">
                    <a href="#" onClick={this.displayHelp}>X</a><br/>
                        The game is TWENTY-FOUR, a 2 or more player game. The goal of this game is to get the highest SUM possible. The catch is you must roll AT LEAST one <img src="assets/images/two-value(2).png" className="description"/> and one <img src="assets/images/four-value(2).png" className="description"/>  for you to be able to count the rest of your roll. The highest possible roll is a <img src="assets/images/two-value(2).png" className="description"/> <img src="assets/images/four-value(2).png" className="description"/>  || <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> <img src="assets/images/six-value(2).png" className="description"/> , which is equal to TWENTY-FOUR. If you don't roll the required <img src="assets/images/two-value(2).png" className="description"/>  & <img src="assets/images/four-value(2).png" className="description"/> , your score is ZERO. You get at most 6 total rolls, however after each roll you must keep at least ONE die. You may choose to keep a roll if you are satisfied, however stay sharp as your friend may capitalize on your mistake. Are you ready? Lets get to rollin'!  </p>
       
                </div>
			</div>
		)
    }
}



