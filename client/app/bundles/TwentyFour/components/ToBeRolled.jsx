import React from 'react';
import FlipMove from 'react-flip-move';
import _ from 'lodash';
import Dice from './Dice';

export default class ToBeRolled extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'ToBeRolled';
    }

    handleDisplay() {
    	var display=[];
    	for(var i = 0; i < this.props.dice.length; i ++) {
    		display.push(<Dice value={this.props.dice[i]} key={i} selectable={true} selectDie={this.props.handleSelectDie}/>)
    	}
    	return (
    		<div className="dice-container">
    			{display}
    		</div>
    	)
    }

    render() {
    	return (
    		<div className="well">
    			<p>Last Roll</p>
                <FlipMove enterAnimation="fade" leaveAnimation="fade">
    			     {this.handleDisplay()}
                </FlipMove>
    		</div>
    	)
    }
}