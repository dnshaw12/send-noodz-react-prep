import React, { Component } from 'react';
import { Segment, Button, Card } from 'semantic-ui-react';

import IngredientInfo from './IngredientInfo'

class ManageIngredients extends Component {

	constructor(){
		super()

		this.state = {
			ingredients: null
		}
	}

	componentDidMount = async () => {
		
		try {
			
			const ingredientsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients')

			const parsedResponse = await ingredientsResponse.json()

			console.log(parsedResponse);

			const ingredientList = parsedResponse.data.filter( ingredient => {
				return ingredient.name !== 'custom'
			}).sort(this.sortByType)

			this.setState({
				ingredients: ingredientList
			})

		} catch(err){
		  console.log(err);
		}

	}

	sortByType = (a, b) => {
		
		const typeA = a.type
		const typeB = b.type

		let comparison = 0

		if (typeA > typeB) {

			comparison = 1

		} else if (typeA < typeB) {

			comparison = -1

		}

		return comparison
	}


	render(){

		let ingredientList = <h1>ManageIngredients</h1>

		if (this.state.ingredients) {

			ingredientList = this.state.ingredients.map( ingredient => {
				return <IngredientInfo ingredient={ingredient} />
			})

		}

		return(

			<Card.Group>
				{ingredientList}
			</Card.Group>

		)
	}
}

export default ManageIngredients