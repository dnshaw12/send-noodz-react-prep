import React from 'react';
import { Segment, Button, Card } from 'semantic-ui-react';

const IngredientInfo = (props) => {

	const inStock = props.ingredient.inStock ? 
		<input 
			type='checkbox' 
			id='inStock'
			onClick={props.updateIngredient.bind(null, props.ingredient._id)} 
			checked
		/> 
		: 
		<input 
			type='checkbox' 
			id='inStock' 
			onClick={props.updateIngredient.bind(null, props.ingredient._id)} 
		/> 
	const archived = props.ingredient.archived ? 
		<input 
			type='checkbox' 
			id='archived'
			onClick={props.updateIngredient.bind(null, props.ingredient._id)}  
			checked
		/> 
		: 
		<input 
			type='checkbox' 
			id='archived' 
			onClick={props.updateIngredient.bind(null, props.ingredient._id)} 
		/> 

	return(

		<Card>
			<Card.Content>
				<h2>{props.ingredient.name}</h2>
				<p>type: {props.ingredient.type}</p>
				<p>In Stock: 
					{inStock}
				</p>
				<p>Archived:  
					{archived}
				</p>
				<Button onClick={props.deleteIngredient.bind(null, props.ingredient._id)}>delete.</Button>
			</Card.Content>
		</Card>

	)
}

export default IngredientInfo