import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, useScrollTrigger, CssBaseline, Grid } from '@material-ui/core';
import { signInWithGoogle, getUser } from '../utils/FirebaseAuthUtils';
import AppDrawer from './AppDrawer';


const ElevationScroll = props => {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

// App bar at the top of the application, example from Material UI
const TopAppBar = (props) => {
	return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar style = {{background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)'}}>
					<Toolbar>
						<AppDrawer setUser={props.setUser} user={props.user} userRole={props.userRole} setPage={props.setPage} />
						<Grid container alignItems="center" justify="space-between">
							<Grid item>
								<Typography>
								<h1 style = {{textAlign: 'center'}}> <div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontWeight: 'bolder', color:'white', letterSpacing:'4px'}}> 
          				THRIFT
          				</div>
          				<div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontStyle: 'italic', color:'white', letterSpacing:'4px', fontWeight: "100"}}> SHIFT</div>
          				</h1>
								</Typography>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
		</React.Fragment>
	);
}

export default TopAppBar;
