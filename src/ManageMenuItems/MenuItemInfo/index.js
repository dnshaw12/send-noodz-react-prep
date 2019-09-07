import React, { Component } from 'react';
import { Card, Segment, Button } from 'semantic-ui-react';

const MenuItemInfo = (props) => {

	const baseIngredients = props.item.baseIngredients.reduce( (acc, ingredient, idx) => {
		
		console.log(idx);

		if (idx === 0) {
			return ingredient.name
		}

		return ingredient.name + ', ' + acc

	}, '')


	return(

		<Card>
			<Card.Content>
				<h2>{props.item.name}</h2>
				<ul>
					<li>noodle: {props.item.noodleType.name}</li>
					<li>protein: {props.item.protein.name}</li>
					<li>sauce: {props.item.sauce.name}</li>
					<li>base ingredients: {baseIngredients}</li>
				</ul>
				<Button onClick={props.handleDelete.bind(null, props.item._id)}>delete.</Button>
			</Card.Content>
		</Card>

		)

}


export default MenuItemInfo