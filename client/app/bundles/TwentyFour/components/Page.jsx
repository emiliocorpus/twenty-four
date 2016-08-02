import React, { PropTypes } from 'react';
import Game from './Game';
import _ from 'lodash';

export default class Page extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: this.props.name
    }
  }
 // <p>The game is TWENTY-FOUR, a 2 or more player game. The goal of this game is to get the highest number possible. The catch is you must roll at least one [2] and one [4] for you to be able to count the rest of your roll. The highest possible roll is a [2][4] || [6][6][6][6], which is equal to TWENTY-FOUR. If you don't roll the required [2] & [4], your score is ZERO. You get at most 6 re-rolls, however after each re-roll you must keep at least ONE die. You may choose to keep a roll if you are satisfied, however stay sharp as your friend (or computer) may capitalize on your mistake. Are you ready? Lets get to rollin'!  </p>
  render() {
    return (
      <div className="row content-container debugger">
       

        <Game/>
      </div>
    );
  }
}