import React, { PropTypes } from 'react';
import Page from '../components/Page';
import Header from '../components/Header'
import _ from 'lodash';

// Simple example of a React "smart" component
export default class PageContainer extends React.Component {
  
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="container-fluid body-container">
        <Page name={this.props.name}/>
      </div>
    );
  }
}
