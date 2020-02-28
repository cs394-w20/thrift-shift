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
					<ListItemIcon><MonetizationOnIcon /></ListItemIcon>
					<ListItemText primary={"Your Listings"} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div>
			<IconButton onClick={() => { setOpen(true) }} edge="start" color="inherit" aria-label="menu">
				<MenuIcon />
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
}

export default AppDrawer