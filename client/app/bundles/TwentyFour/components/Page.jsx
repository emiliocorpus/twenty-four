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
 // 
  render() {
    return (
      <div className="row content-container">
        <Game/>
      </div>
    );
  }
}