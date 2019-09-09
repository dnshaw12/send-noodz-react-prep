import React, { Component } from 'react';
import { Segment, Button, Form, Checkbox, Card } from 'semantic-ui-react';

class AddMenuItem extends Component {
	constructor(){
		super()

		this.state = {
			name: '',
			noodle: '',
			protein: '',
			sauce: '',
			baseIngredients: [],
			basePrice: 0,
			image: {},
			ingredients: [],
			message: ''

		}
	}

	componentDidMount = async () => {
		
		try {
			
			const ingredientsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients')

			const parsedResponse = await ingredientsResponse.json()

			const ingredientList = parsedResponse.data.filter( ingredient => {
				return ingredient
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

	handleUniqueSelection = (e) => {

		console.log(e.target);

		// if (this.state[e.target.name]) {
		// 	console.log(this.state[e.target.name]);
		// } else {
			this.setState({[e.target.name]: e.target.id})
		// }

	}

	handleChange = (e) => {
		if(e.target.name !== 'image'){
         this.setState({[e.target.name]: e.target.value});
      } else {
         // file upload
         console.log(e.target);
         this.setState({image: e.target.files[0]});
      }
	}

	handelSubmit = async () => {

		if (!this.state.name) {
			this.setState({message: 'please enter a valid name'})
		} else if (!this.state.basePrice) {
			this.setState({message: 'please enter a valid price'})
		} else if (!this.state.noodle) {
			this.setState({message: 'please enter a valid noodle option'})
		} else if (!this.state.protein) {
			this.setState({message: 'please enter a valid protein option'})
		} else if (!this.state.sauce) {
			this.setState({message: 'please enter a valid sauce option'})
		} else if (!this.state.baseIngredients.length) {
			this.setState({message: 'please add at least one base ingredient'})
		} else {

			const data = new FormData();
	      data.append('name', this.state.name);
	      data.append('basePrice', this.state.basePrice);
	      data.append('noodleType', this.state.noodle);
	      data.append('protein', this.state.protein);
	      data.append('sauce', this.state.sauce);

	      if (this.state.baseIngredients.length) {

	      	data.append('baseIngredients', JSON.stringify(this.state.baseIngredients));
	      }
	      data.append('image', this.state.image);

	      const newMenuItemResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems/',{
					method: 'POST',
		        	credentials: 'include',
		        	body: data,
		        	headers: {
		         	'enctype': 'multipart/form-data'
	       		}
				})

	      const parsedResponse = await newMenuItemResponse.json()

	      console.log(parsedResponse);

	      this.props.addMenuItem(parsedResponse.data)

		}


	}

	render() {

		console.log('rerender');

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
				<p>{this.state.message}</p>	
				<Form onSubmit={this.handelSubmit}>
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

	           	<Form.Input fluid icon='dollar' iconPosition='left' placeholder='base price.' type='number' step='0.01' name='basePrice' onChange={this.handleChange}/>
	           	<Form.Input fluid icon='camera' iconPosition='left' type="file" name='image' onChange={this.handleChange}/>
	            
	            <Button fluid type='sumbit'>submit.</Button>
	         </Form>	
         </Segment>
		)

	}
}

export default AddMenuItem