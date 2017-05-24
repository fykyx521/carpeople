import React, { Component } from 'react';
import logo from './logo.svg';
import Search from './Page/Search'
import './App.css';

// import 'weui';
// import 'react-weui/lib/react-weui.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search></Search>
      </div>
    );
  }
}

export default App;
