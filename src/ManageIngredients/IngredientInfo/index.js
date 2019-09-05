import React from 'react';
import { Segment, Button, Card } from 'semantic-ui-react';

const IngredientInfo = (props) => {

	return(

		<Card>
			<Card.Content>
				<Card.Header>{props.ingredient.name}</Card.Header>
				<p>type: {props.ingredient.type}</p>
				<p>In Stock: <input 
					type='checkbox' 
					id='inStock' 
					// {props.ingredient.inStock ? 'checked' : null}
					/>
				</p>
				<p>Archived: <input 
					type='checkbox' 
					id='archived' 
					// {props.ingredient.archived ? 'checked' : null}
					/>
				</p>
			</Card.Content>
		</Card>

	)
}

export default IngredientInfo