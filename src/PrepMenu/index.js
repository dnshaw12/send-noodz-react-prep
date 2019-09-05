import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class PrepMenu extends Component {

	handleClick = (e, { name }) => {
		this.props.history.push(`/${name}`)
	}

	render(){
		return(


			<Segment>
				<h1>prep some noodz.</h1>
				<Menu>
					<Menu.Item
							name=''
							onClick={this.handleClick}
						>
							current orders.
					</Menu.Item>
					<Menu.Item
							name='manage-ingredients'
							onClick={this.handleClick}
						>
							manage ingredients.
					</Menu.Item>

					<Menu.Item
							name='new-menu-item'
							onClick={this.handleClick}
						>
							add new menu item.
					</Menu.Item>
				</Menu>
			</Segment>
		)

	}

}

export default withRouter(PrepMenu)