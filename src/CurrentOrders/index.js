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

	updateStatus = async (orderId, status) => {

		try {

			const updatedOrderResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/' + orderId,{
					method: 'PUT',
		        	credentials: 'include',
		        	body: JSON.stringify({status: status}),
		        	headers: {
		         	'Content-Type': 'application/json'
	       		}
				})

				const parsedResponse = await updatedOrderResponse.json()



				const updatedOrders = this.state.orders

				console.log(updatedOrders, orderId);

				updatedOrders[updatedOrders.findIndex( order => order._id === orderId)] = parsedResponse.data

				console.log(updatedOrders);

				this.setState({
					orders: updatedOrders
				})
			
		} catch(err){
		  console.log(err);
		}

	}

	render(){

		let orders = <h1>CURRENT ORDERS</h1>

		if (this.state.orders) {

			orders = this.state.orders.map( order => {
				return <OrderInfo updateStatus={this.updateStatus} makePrettyDate={this.props.makePrettyDate} order={order} />
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