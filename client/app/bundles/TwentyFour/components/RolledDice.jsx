import React from 'react';
import _ from 'lodash';
import Dice from './Dice';

export default class RolledDice extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'RolledDice';

        this.state = {
        	gameState: "hello"
        }
    }

    render() {
    	return (
    		<div className="well">
    			Rolled Dice
    		</div>
    	)
    }
}