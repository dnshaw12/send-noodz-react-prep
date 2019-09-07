import React, { Component } from 'react';
import { Segment, Button, Form, Checkbox, Card } from 'semantic-ui-react';

class AddMenuItem extends Component {
	constructor(){
		super()

		this.state = {
			name: '',
			noodleType: '',
			protein: '',
			sauce: '',
			baseIngredients: [],
			basePrice: 0,
			image: {},
			ingredients: []

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

	handleBaseSelection = (e) => {

		console.log(e.target.id, e.target.checked);

		let newBaseIngredients = this.state.baseIngredients

		if (e.target.checked) {
			newBaseIngredients.push(e.target.id)
		} else {
			newBaseIngredients = newBaseIngredients.filter( id => id !== e.target.id)
		}

		this.setState({baseIngredients: newBaseIngredients})

	}

	render() {

		const noodles = this.state.ingredients
			.filter(ingredient => ingredient.type === 'noodle')
			.map( ingredient => {
				
				return(
					<Card className='ingredientCard'>
					{
	           		this.state.noodleType === ingredient._id  
	           		? 
		           	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	defaultChecked
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleUniqueSelection}/> 
		            	<span>{ingredient.name}</span>
		            </Card.Content>
		            : 
	            	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleUniqueSelection}/> 
		            	<span>{ingredient.name}</span>
	            	</Card.Content>
	            }
	            </Card>

				)
		})

		const proteins = this.state.ingredients
			.filter(ingredient => ingredient.type === 'protein')
			.map( ingredient => {
				return(
					<Card className='ingredientCard'>
					{
	           		this.state.protein === ingredient._id
	           		? 
		           	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	defaultChecked
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleUniqueSelection}/> 
		            	<span>{ingredient.name}</span>
		            </Card.Content>
		            : 
	            	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleUniqueSelection}/> 
		            	<span>{ingredient.name}</span>
	            	</Card.Content>
	            }
	            </Card>

				)
		})

		const sauces = this.state.ingredients
			.filter(ingredient => ingredient.type === 'sauce')
			.map( ingredient => {
				return(
					<Card className='ingredientCard'>
					{
	           		this.state.sauce === ingredient._id 
	           		? 
	           			<Card.Content>
				           	<Checkbox 
				            	fluid 
				            	defaultChecked
				            	id={ingredient._id}
				            	name={ingredient.type} 
				            	onChange={this.handleUniqueSelection}/> 
			            	<span>{ingredient.name}</span>
			            </Card.Content>
		            : 
	            		<Card.Content>
				           	<Checkbox 
				            	fluid 
				            	id={ingredient._id}
				            	name={ingredient.type} 
				            	onChange={this.handleUniqueSelection}/> 
			            	<span>{ingredient.name}</span>
		            	</Card.Content>
	            }
	            </Card>

				)
		})

		const normals = this.state.ingredients
			.filter(ingredient => ingredient.type === 'normal')
			.map( ingredient => {
				return(
					<Card className='ingredientCard'>
					{
	           		this.state.baseIngredients.some( id => !id === ingredient._id) 
	           		? 
		           	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	defaultChecked
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleBaseSelection}/> 
		            	<span>{ingredient.name}</span>
		            </Card.Content>
		            : 
	            	<Card.Content>
			           	<Checkbox 
			            	fluid 
			            	id={ingredient._id}
			            	name={ingredient.type} 
			            	onChange={this.handleBaseSelection}/> 
		            	<span>{ingredient.name}</span>
	            	</Card.Content>
	            }
	            </Card>

				)
		})


		return(
			<Segment>
				<Form onSubmit={this.createIngredient}>
					name:
	            <Form.Input fluid icon='keyboard outline' iconPosition='left' placeholder='name.' type='text' name='name' onChange={this.handleChange}/>

					<Segment>            	
	            	Noodes: 
		            <Card.Group>
		           		{noodles}
		           	</Card.Group>
	           	</Segment>
					<Segment>	
		           	Proteins: 
		           	<Card.Group>
		           		{proteins}
		           	</Card.Group>
	           	</Segment>
					<Segment>
		           	Sauces: 
		           	<Card.Group>
		           		{sauces}
		           	</Card.Group>
	           	</Segment>
					<Segment>
	           		Normals: 
		           	<Card.Group>
		           		{normals}
		           	</Card.Group>
	           	</Segment>

	           	<Form.Input fluid icon='dollar' iconPosition='left' placeholder='base price.' type='text' name='basePrice' onChange={this.handleChange}/>
	           	<Form.Input fluid icon='camera' iconPosition='left' type="file" name='image' onChange={this.handleChange}/>
	            
	            <Button fluid type='sumbit'>submit.</Button>
	         </Form>	
         </Segment>
		)

	}
}

export default AddMenuItem