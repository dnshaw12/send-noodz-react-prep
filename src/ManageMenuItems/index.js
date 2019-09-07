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

	addMenuItem = (newItem) => {

		const newMenuItemList = this.state.menuItems

		newMenuItemList.push(newItem)

		this.setState({
			addMenuItemActive: false,
			menuItems: newMenuItemList
		})

	}

	handleDelete = async (id) => {

		try {

			const deletedMenuItem = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems/' + id ,{
					method: 'DELETE'
			})

			const parsedResponse = await deletedMenuItem.json()

			let newMenuItemList = this.state.menuItems

			newMenuItemList = newMenuItemList.filter( item => item._id !== id)

			this.setState({menuItems: newMenuItemList})
			
		} catch(err){
		  console.log(err);
		}
	}

	render(){

		const menuItemsList = this.state.menuItems.map(item => {
			return <MenuItemInfo handleDelete={this.handleDelete} item={item} />
		})

		return(
			<Segment>
				<h1>Manage Menu Items</h1>

				<Button onClick={this.toggleAdd}>{this.state.addMenuItemActive ? 'close.' : 'Add Menu Item' }</Button>

				{ this.state.addMenuItemActive ? <AddMenuItem addMenuItem={this.addMenuItem} /> : null}

				<Card.Group>
					{menuItemsList}
				</Card.Group>

			</Segment>

		)
	}

}


export default ManageMenuItems