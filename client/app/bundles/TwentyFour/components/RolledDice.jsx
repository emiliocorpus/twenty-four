import React from 'react';
import FlipMove from 'react-flip-move';
import _ from 'lodash';
import Dice from './Dice';

export default class RolledDice extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'RolledDice';
    }

    render() {
    	return (
    		<div className="well">
    			Rolled Dice
    		</div>
    	)
    }
}