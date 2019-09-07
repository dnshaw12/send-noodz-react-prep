import React, { Component } from 'react';
import { Card, Segment, Button } from 'semantic-ui-react';

import MenuItemInfo from './MenuItemInfo'
import AddMenuItem from './AddMenuItem'

class ManageMenuItems extends Component {

	constructor(){
		super()

		this.state = {
			menuItems: [],
			addMenuItemActive: false
		}
	}

	componentDidMount = async () => {
		
		try {
			
			const menuItemsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems')

			const parsedResponse = await menuItemsResponse.json()

			console.log(parsedResponse);

			const menuItemsList = parsedResponse.data.filter( item => {
				return item.name !== 'byon'
			})

			this.setState({
				menuItems: menuItemsList
			})

		} catch(err){
		  console.log(err);
		}


	}

	toggleAdd = () => {
		this.setState({addMenuItemActive: !this.state.addMenuItemActive})
	}

	render(){

		const menuItemsList = this.state.menuItems.map(item => {
			return <MenuItemInfo item={item} />
		})

		return(
			<Segment>
				<h1>Manage Menu Items</h1>

				<Button onClick={this.toggleAdd}>{this.state.addMenuItemActive ? 'close.' : 'Add Menu Item' }</Button>

				{ this.state.addMenuItemActive ? <AddMenuItem /> : null}

				<Card.Group>
					{menuItemsList}
				</Card.Group>

			</Segment>

		)
	}

}


export default ManageMenuItems