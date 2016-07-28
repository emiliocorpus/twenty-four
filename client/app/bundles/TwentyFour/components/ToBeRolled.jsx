import React from 'react';
import _ from 'lodash';
import Dice from './Dice';

export default class ToBeRolled extends React.Component {
	constructor(props) {
        super(props);
        this.displayName = 'ToBeRolled';

        this.state = {
        	gameState: "hello"
        }
    }

    render() {
    	return (
    		<div className="well">
    			<p>Unrolled Dice</p>
    			<Dice value={1}/>
    			<Dice value={2}/>
    			<Dice value={3}/>
    			<Dice value={4}/>
    			<Dice value={5}/>
    			<Dice value={6}/>
    		</div>
    	)
    }
}