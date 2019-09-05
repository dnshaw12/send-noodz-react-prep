import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import OrderInfo from './OrderInfo'

class CurrentOrders extends Component {

	constructor(){
		super()

		this.state = {
			orders: null
		}
	}

	componentDidMount = async () => {

		console.log('CurrentOrders mounted',process.env);
		
		const ordersResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/active')

		console.log(ordersResponse);

		const parsedResponse = await ordersResponse.json()

		console.log(parsedResponse);

		this.setState({
			orders: parsedResponse.data
		})

	}

	render(){

		let orders = <h1>CURRENT ORDERS</h1>

		if (this.state.orders) {

			orders = this.state.orders.map( order => {
				return <OrderInfo order={order} />
			})

		}

		return(

			<Segment>
				{orders}
			</Segment>

		)
	}
}

export default CurrentOrders