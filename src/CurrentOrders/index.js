import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import OrderInfo from './OrderInfo'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)

class CurrentOrders extends Component {

	constructor(){
		super()

		this.state = {
			orders: null
		}
	}

	componentDidMount = async () => {
		
		const ordersResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders/active')

		const parsedResponse = await ordersResponse.json()

		socket.on('new order', data => {
			
			const updatedOrders = this.state.orders

			updatedOrders.push(data)

			this.setState({
				orders: updatedOrders
			})
		})

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


				// if archiving the order, remove it from state
				if (status !== 'archived') {
					updatedOrders[updatedOrders.findIndex( order => order._id === orderId)] = parsedResponse.data
				} else {
					updatedOrders.splice(updatedOrders.findIndex( order => order._id === orderId), 1)
				}

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
				<h1>orders pending: {this.state.orders ? this.state.orders.length : 0}</h1>
				{orders}
			</Segment>

		)
	}
}

export default CurrentOrders