import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import Avatar from '@material-ui/core/Avatar';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Badge, Grid, Typography, Divider } from '@material-ui/core';
import { getUserInfo } from '../utils/FirebaseDbUtils';
import { getUser } from '../utils/FirebaseAuthUtils';
import { signOut } from '../utils/FirebaseAuthUtils';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
			<List style={{background: 'linear-gradient(153deg, #67A6FC 50%, #D4FFE8 90%)'}}>
				<ListItem>
					<Grid conatiner style={{ marginTop: '50px' }}>
						<Grid item >
							<Avatar src={props.user.photoURL} style={{ marginBottom: '10px' }}/>
						</Grid>
						<Grid item>
							<Typography variant='body1' style={{color:'white'}}>{props.user.displayName}</Typography>
							<Typography variant='body2' style={{color:'#F0F0F0'}}>{props.user.email}</Typography>
						</Grid>
					</Grid>
				</ListItem>
			</List>
			<Divider />
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
				<ListItem button onClick={() => {signOut()}}>
					<ListItemIcon><ExitToAppIcon/></ListItemIcon>
					<ListItemText primary={"Sign Out"} />
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