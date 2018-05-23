import React, { Component } from 'react';
import { Header } from './components/index';
import { PostContainer } from './containers/index';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <PostContainer />
      </div>
    );
  }
}

export default App;
