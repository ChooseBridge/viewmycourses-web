import React, { Component } from 'react';

export default class extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    window.socialShare('#social-share');
  }

  render() {
    return <div id="social-share" />;
  }
}