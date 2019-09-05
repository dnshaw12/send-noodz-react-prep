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

				{dishes}

				<div>order status: {this.props.order.status}</div>

			</Segment>
		)

	}


}

export default OrderInfo