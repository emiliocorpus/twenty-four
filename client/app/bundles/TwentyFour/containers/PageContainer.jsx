import React, { PropTypes } from 'react';
import Page from '../components/Page';
import _ from 'lodash';

// Simple example of a React "smart" component
export default class PageContainer extends React.Component {
  
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="container body-container">
        <Page name={this.props.name}/>
      </div>
    );
  }
}
