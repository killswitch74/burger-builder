import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import * as actionCreators from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.autoAuthHandler();
  }

  render() {

    return (
      <div className="App">
        {/* <BrowserRouter basename="https://killswitch74.github.io/burger-builder"> */}
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthHandler: () => dispatch(actionCreators.autoAuthHandler())
  }
}

export default connect(null, mapDispatchToProps)(App);