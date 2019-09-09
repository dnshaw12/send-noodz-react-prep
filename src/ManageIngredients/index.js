import React, { Component } from 'react';
import { Segment, Button, Card, Form } from 'semantic-ui-react';

import IngredientInfo from './IngredientInfo'

class ManageIngredients extends Component {

	constructor(){
		super()

		this.state = {
			addOpen: false,
			ingredients: null,
			name: '',
			type: 'noodle',
			vegitarian: false,
			vegan: false,
			price: 0,
			image: {}
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

	updateIngredient = async (id, e) => {
		
		console.log(e.target.checked, e.target.id, id);

		const updatedIngredientResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients/' + id,{
					method: 'PUT',
		        	credentials: 'include',
		        	body: JSON.stringify({[e.target.id]: e.target.checked}),
		        	headers: {
		         	'Content-Type': 'application/json'
	       		}
				})

		const parsedResponse = await updatedIngredientResponse.json()

		console.log(parsedResponse);

		const newIngredientList = this.state.ingredients

		newIngredientList[newIngredientList
			.findIndex( ingredient => ingredient._id === id)] = parsedResponse.data

		this.setState({
			ingredients: newIngredientList
		})

	}

	handleChange = (e) => {

		if (e.target.name === 'vegitarian' || e.target.name === 'vegan') {
				this.setState({[e.target.name]: e.target.checked})
		} else if (e.target.name === 'image') {
			this.setState({image: e.target.files[0]})
		} else {
			this.setState({[e.target.name]: e.target.value})
		}


	}

	createIngredient = async (e) => {
		e.preventDefault()

		this.toggleAdd()

		e.target.name.value = ''
		e.target.type.value = 'noodle'
		e.target.vegitarian.checked = false
		e.target.vegan.checked = false
		e.target.price.value = ''
		e.target.image.value = null

		const data = new FormData();
      data.append('name', this.state.name);
      data.append('type', this.state.type);
      data.append('vegitarian', this.state.vegitarian);
      data.append('phoneNumber', this.state.phoneNumber);
      data.append('vegan', this.state.vegan);
      data.append('price', this.state.price);
      data.append('image', this.state.image);

		const newIngredientResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients/',{
					method: 'POST',
		        	credentials: 'include',
		        	body: data,
		        	headers: {
		         	'enctype': 'multipart/form-data'
	       		}
				})

		const parsedResponse = await newIngredientResponse.json()

		const newIngredientList = this.state.ingredients

		newIngredientList.push(parsedResponse.data)

		newIngredientList.sort(this.sortByType)

		this.setState({ingredients: newIngredientList})

	}

	toggleAdd = () => {
		this.setState({addOpen:!this.state.addOpen})
	}

	deleteIngredient = async (id) => {

		try {

			const deletedIngredient = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients/' + id ,{
					method: 'DELETE'
				})

			const parsedResponse = await deletedIngredient.json()

			let newIngredientList = this.state.ingredients

			newIngredientList = newIngredientList.filter( ingredient => ingredient._id !== id)

			this.setState({ingredients: newIngredientList})


			
		} catch(err){
		  console.log(err);
		}

	}


	render(){

		console.log(this.state);

		let ingredientList = <h1>ManageIngredients</h1>

		if (this.state.ingredients) {

			ingredientList = this.state.ingredients.map( ingredient => {
				return <IngredientInfo deleteIngredient={this.deleteIngredient} ingredient={ingredient} updateIngredient={this.updateIngredient}/>
			})

		}

		return(
			<Segment>
				<Segment>
					<Button 
						onClick={this.toggleAdd}>

						{this.state.addOpen ? 'close.' : 'add ingredient.'}

					</Button>

					{this.state.addOpen ?

						<Form onSubmit={this.createIngredient}>
							name:
			            <Form.Input fluid icon='keyboard outline' iconPosition='left' placeholder='name.' type='text' name='name' onChange={this.handleChange}/>
			            type:
			            <select name='type' onChange={this.handleChange}>
			            	<option value='noodle'>noodle.</option>
			            	<option value='protein'>protein.</option>
			            	<option value='sauce'>sauce.</option>
			            	<option value='normal'>normal.</option>
			            </select>
			            vegitarian:
			            <Form.Input fluid type='checkbox' name='vegitarian' onChange={this.handleChange}/>
			            vegan:
			            <Form.Input fluid type='checkbox' name='vegan' onChange={this.handleChange}/>
			            price:
			            <Form.Input fluid icon='dollar' iconPosition='left' placeholder='price.' type='number' step="0.01" name='price' onChange={this.handleChange}/>
			            image:
		               <Form.Input fluid icon='camera' iconPosition='left' type="file" name='image' onChange={this.handleChange}/>
			            <Button fluid type='sumbit'>submit.</Button>
		            </Form>

		         :

		         	null
		         	
					}

				</Segment>
				<Card.Group>
					{ingredientList}
				</Card.Group>
			</Segment>

		)
	}
}

export default ManageIngredients