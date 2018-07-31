import React, { Component } from 'react'
import Themes from './components/Themes/Themes'
import Funders from './components/Funders/Funders'
import './App.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
require('bootstrap')



export default (class App extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    var path = window.location.pathname
    if (path === '/') {
      window.location = '/trend/education/amount'
    }
  }

  render() {
  return(
      <Router>
        <div>
          <Route path="/trend/:theme/:field" component={Themes} />
          <Route path="/funder" component={Funders} />
        </div>
      </Router>
    )
  }

})
