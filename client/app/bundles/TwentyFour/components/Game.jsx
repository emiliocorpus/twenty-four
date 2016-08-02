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
            selected:[]

        }

        _.bindAll(this, ['handleSubmitPlayers', 'handleSubmitComputers', 'displayDice', 'handleActiveGame', 'handleRoll','addSelected', 'removeSelected', 'handleSubmitSelectedDice', 'calculateScore'])
    }
    // METHODS FOR CURRENTSTAGE == "start"
    handleStart() {
        console.log("You are at the start setup")
        return(
            <div>
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
                    <input type='submit'/>
                </form>
            </div>
        )    
    }
    handleSubmitPlayers(e) {
        e.preventDefault()
        this.setState({
            totalPlayers: parseInt(e.target.children[0].value),
            currentStage: "chooseComputers"
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
            currentStage: "active",
            currentTurn: 0,
            pointInTurn: "roll"
        })
    }


    //METHODS FOR AN ACTIVE GAME
    handleActiveGame() {
        var button
        if (this.state.pointInTurn === "roll") {
            button = <button onClick={this.handleRoll}>Roll</button>
        }
        else {
            button = <button onClick={this.handleSubmitSelectedDice}>Select</button>
        }
        return (
            <div className="row debugger-blue">
                <div className="row">
                    <div className=".col-xs-6 .col-sm-4 col-md-4">
                        CURRENT TURN:<br/>
                        Player {this.state.currentTurn + 1}
                    </div>

                    <div className=".col-xs-6 .col-sm-4 col-md-4">
                        TOTAL SCORE:<br/>
                        {this.state.totalScore}
                    </div>

                    <div className=".col-xs-6 .col-sm-4 col-md-4">
                        SCORE TO BEAT:<br/>
                        --
                    </div>
                </div>

                <div className="row">
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

                {button}
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
        var values=[]
        for (var i=0; i< this.state.selected.length;i++){
            values.push(this.state.selected[i].props.value)
        }
        var kept = this.state.keptDice.concat(values)
        var score = this.calculateScore(kept)
        if (this.state.keptDice.length === 5) {
            this.setState({
                keptDice: [],
                selected:[],
                lastRoll:[],
                scores:this.state.scores.concat([score]),
                pointInTurn:"roll",
                currentTurn: this.state.currentTurn + 1,
                totalScore: "--"
            })
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















    controlGameFlow(){
        var display
        switch(this.state.currentStage) {
            case "start":
                display = this.handleStart()
                break
            case "chooseComputers":
                display = this.handleChooseComputers()
                break
            case "active":
                display = this.handleActiveGame()
                break
            case "end":
                console.log("You have reached the end game")
                display = <p>You have reaced the end game</p>
                break
            default:
                display = <p>You are at the default start setup</p>
                console.log("You are at the default start setup")
        }
        return display
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
			<div className="col-md-12 debugger-green">
                {display}
			</div>
		)
    }
}



