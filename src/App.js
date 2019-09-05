import React, { Component } from 'react';
import { Route, Switch, withRouter, BrowserRouter as Router } from 'react-router-dom';

import PrepMenu from './PrepMenu'
import CurrentOrders from './CurrentOrders'
import ManageIngredients from './ManageIngredients'



class App extends Component {

	makePrettyDate = (str) => {

      const date = new Date(str);

      const options = { 
         // weekday: 'short', 
         year: 'numeric', 
         month: 'numeric', 
         day: 'numeric', 
         timeZone: 'America/Chicago', 
         hour: 'numeric',
         hour12: true, 
         minute: 'numeric' };

      return date.toLocaleDateString('en-US',options)

   }

	render(){

	  return (
	    <main className="App">
	      <PrepMenu />
	      <Switch>
	      	<Route exact path='/' render={(props) => <CurrentOrders {...props} makePrettyDate={this.makePrettyDate}/>  } />
	      	<Route exact path='/manage-ingredients' render={(props) => <ManageIngredients {...props}/>  } />
	      </Switch>
	    </main>
	  )
	}
}

export default withRouter(App);
