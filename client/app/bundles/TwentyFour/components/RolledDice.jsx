import React from 'react';
import FlipMove from 'react-flip-move';
import _ from 'lodash';
import Dice from './Dice';

export default class RolledDice extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'RolledDice';
    }

    handleDisplay() {
    	var display=[];
    	for(var i = 0; i < this.props.dice.length; i ++) {
    		debugger
    		display.push(<Dice value={this.props.dice[i].props.value} key={i} selectable={false} />)
    	}
    	return (
    		<div className="dice-container">
    			<FlipMove enterAnimation='elevator' leaveAnimation="elevator">
    				{display}
    			</FlipMove>
    		</div>
    	)
    }

    render() {
    	return (
    		<div className="well">
    			<p>Rolled Dice</p>
    			
    				{this.handleDisplay()}
    			
    		</div>
    	)
    }
}