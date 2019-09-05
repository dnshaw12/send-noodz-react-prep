import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import DishInfo from './DishInfo'

class OrderInfo extends Component {

	render(){

		const dishes = this.props.order.dishes.map( dish => {
			return <DishInfo dish={dish} />
		})

		return(

			<Segment>

				<h3>order id: {this.props.order._id}</h3>
				<p>placed at: {this.props.makePrettyDate(this.props.order.createdDate)}</p>

				{dishes}

				<p>delivery instructions: {this.props.order.deliveryInstructions}</p>

				<div>order status: {this.props.order.status}</div>

			</Segment>
		)

	}


}

export default OrderInfo