import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

import DishInfo from './DishInfo'

class OrderInfo extends Component {

	updateStatus = (e) => this.props.updateStatus(this.props.order._id, e.target.id)

	archiveOrder = (e) => this.props.updateStatus(this.props.order._id, 'archived')

	render(){

		const dishes = this.props.order.dishes.map( dish => {
			return <DishInfo dish={dish} />
		})

		return(

			<Segment>

				<h3>order id: {this.props.order._id}</h3>
				<p>ordered by: {this.props.order.userId.name}</p>
				<p>placed at: {this.props.makePrettyDate(this.props.order.createdDate)}</p>

				{dishes}

				<p>delivery instructions: {this.props.order.deliveryInstructions}</p>
				<div className='statusBar'>
					<div 
						id='received' 
						className={'statusButton'  + (this.props.order.status === 'received' ? ' statusButtonActive': '')}
						onClick={this.updateStatus}
						>
						received.
					</div>
					<div 
						id='prepping' 
						className={'statusButton'  + (this.props.order.status === 'prepping' ? ' statusButtonActive': '')}
						onClick={this.updateStatus}
						>
						prepping.
					</div>
					<div 
						id='complete' 
						className={'statusButton'  + (this.props.order.status === 'complete' ? ' statusButtonActive': '')}
						onClick={this.updateStatus}
						>
						complete.
					</div>
				</div>
				<Button onClick={this.archiveOrder}>archive.</Button>

			</Segment>
		)

	}


}

export default OrderInfo