import React, { Component } from 'react';
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom';

import PrepMenu from './PrepMenu'
import CurrentOrders from './CurrentOrders'



class App extends Component {

	render(){

	  return (
	    <main className="App">
	      <PrepMenu />
	      <Switch>
	      	<Route exact path='/' render={(props) => <CurrentOrders {...props} signUp={this.signUp}/>  } />
	      </Switch>
	    </main>
	  )
	}
}

export default withRouter(App);
