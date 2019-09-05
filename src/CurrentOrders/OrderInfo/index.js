import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class OrderInfo extends Component {

	render(){

		return(

			<Segment>

				<h1>order id: {this.props.order._id}</h1>
				<h2>order status: {this.props.order.status}</h2>

			</Segment>
		)

	}


}

export default OrderInfo