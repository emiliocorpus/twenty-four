import React from 'react';
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
            pointInTurn:null,
            totalPlayers: 2,
            totalComputers:0,
            lastRoll:[],
            keptDice:[],
            selected:[]

        }

        _.bindAll(this, ['handleSubmitPlayers', 'handleSubmitComputers', 'displayDice', 'handleActiveGame', 'handleRoll',])
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
                        69
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
                    display.push(<Dice value={dice[i]} selectable={true} key={i}/>)
                }
                break
        }
        
        return display
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

    render() {
        var display = this.controlGameFlow()
		return (
			<div className="col-md-12 debugger-green">
                {display}
			</div>
		)
    }
}



