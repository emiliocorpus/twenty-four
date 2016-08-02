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
            totalPlayers: 2,
            totalComputers:0


        }
       
    }

    handleSubmitPlayers(e) {
        e.preventDefault()
        debugger
    }


    controlGameFlow(){
        var display
        switch(this.state.currentStage) {
            case "start":
                console.log("You are at the start setup")
                display = 
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
                break
            case "active":
                console.log("You are in an active game")
                display = <p>You are in an active game</p>
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



