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
        	gameState: "hello"
        }
    }

    handleClick() {
    	this.setState({
    		gameState: "goodbye"
    	})
    }

    handleGameState() {

   	}

    render() {
        return (
        	<div className="col-lg-12 debugger-green">
	        	<div className="row">
	        		<RolledDice />
	        		<ToBeRolled /> 
	        	</div>
	        </div>
        )
    }
}



