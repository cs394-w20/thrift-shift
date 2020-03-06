import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Badge } from '@material-ui/core';
import { getUserInfo } from '../utils/FirebaseDbUtils';
import { getUser } from '../utils/FirebaseAuthUtils';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

const AppDrawer = props => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [userInfo, setUserInfo] = React.useState(null)

	React.useEffect(() => {
		if (getUser()) {
			console.log('test')
			getUserInfo(getUser().uid, setUserInfo)
		}
	}, [getUser()])

	const calculateBadgeContent = () => {
		if (props.userRole == 'seller') {
			if (userInfo.sellerNotification) {
				return userInfo.sellerNotification
			} else {
				return 0
			}
		} else {
			if (userInfo.buyerNotification) {
				return userInfo.buyerNotification
			} else {
				return 0
			}
		}
	}

	const sideList = () => (
		<div
			className={classes.list}
			role="presentation"
			onClick={() => { setOpen(false) }}
			onKeyDown={() => { setOpen(false) }}
		>
			<List>
				<ListItem button onClick={() => { props.setPage("product") }}>
					<ListItemIcon><ViewListIcon /></ListItemIcon>
					<ListItemText primary={"Your Items"} />
				</ListItem>
				<ListItem button onClick={() => { props.setPage("bid") }}>
					<ListItemIcon>
						<Badge color='secondary' badgeContent={calculateBadgeContent()} invisible={calculateBadgeContent() === 0}>
							<MonetizationOnIcon />
						</Badge>
					</ListItemIcon>
					<ListItemText primary={props.userRole === 'seller' ? "Your Listings" : "Your Bids"} />
				</ListItem>
			</List>
		</div>
	);

	if (props.user && userInfo) {
		return (
			<div>
				<IconButton onClick={() => { setOpen(true) }} edge="start" color="inherit" aria-label="menu">
					<Badge color='secondary' badgeContent={calculateBadgeContent()} invisible={calculateBadgeContent() === 0}>
						<MenuIcon />
					</Badge>
				</IconButton>

				<SwipeableDrawer
					open={open}
					onClose={() => { setOpen(false) }}
					onOpen={() => { setOpen(true) }}
				>
					{sideList('left')}
				</SwipeableDrawer>
			</div>
		);
	} else {
		return null
	}
}

export default AppDrawer