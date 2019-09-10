import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)

class PrepMenu extends Component {

	constructor(){
		super()

		this.state = {
			newOrders: 0
		}


	}

	componentDidMount(){

		socket.on('new order', data => {
			console.log('new order', this.state.newOrders);
			this.setState({
				newOrders: this.state.newOrders + 1
			})
		})

	}

	handleClick = (e, { name }) => {

		if (name === '') {
			this.setState({newOrders: 0})
		}

		this.props.history.push(`/${name}`)
	}

	render(){

		const newOrderIcon = this.state.newOrders ? <div className='newOrderIcon'>{this.state.newOrders}</div> : null

		return(


			<Segment>
				<h1>prep some noodz.</h1>
				<Menu>
					<Menu.Item
							name=''
							onClick={this.handleClick}
						>
							{newOrderIcon}
							current orders.
					</Menu.Item>
					<Menu.Item
							name='manage-ingredients'
							onClick={this.handleClick}
						>
							manage ingredients.
					</Menu.Item>

					<Menu.Item
							name='manage-menu-items'
							onClick={this.handleClick}
						>
							manage menu items.
					</Menu.Item>
				</Menu>
			</Segment>
		)

	}

}

export default withRouter(PrepMenu)