import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/index';
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
// var Timer = require('Timer');
// var Countdown = require('Countdown');
//
// // Load foundation
// require('style!css!foundation-sites/dist/foundation.min.css')
// $(document).foundation();
//
// // App css
// require('style!css!sass!applicationStyles')
//
ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
document.getElementById('app')
);

// ReactDOM.render(
//   <HelloWorld name="JOh"/>,
//   document.getElementById('app')
// );
