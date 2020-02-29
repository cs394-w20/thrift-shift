import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getProductBidInfo, getProductInfo, getBuyerInfo } from '../../utils/FirebaseDbUtils'
import { Divider, Grid, List, MenuItem, ExpansionPanelActions, Button, Fade, Radio } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: "red"
	},
	bid: {
		padding: 0
	},
	details: {
		padding: 0
	},
	accept: {
		color: "green"
	}
}));

const BuyerInfo = () => {
	return (
		<div>
			<Typography>
				My Store
			</Typography>
			<Typography>
				2331 Sherman Road
			</Typography>
			<Typography>
				Tel: 7756371234
			</Typography>
		</div>
	)
}



const BidItem = props => {
	const classes = useStyles();
	const [bids, setBids] = React.useState(null)
	const [product, setProduct] = React.useState(null)
	const [selected, setSelected] = React.useState(null)
	const [accepted, setAccepted] = React.useState(null)

	const handleAccept = () => {
		setAccepted(true)
	}

	const handleChange = () => {
		if (props.open === props.productId) {
			props.setOpen(null)
		} else {
			props.setOpen(props.productId)
		}
	}

	const getDate = (time) => {
		let date = new Date(time);
		let standardDate = date.toString();
		return standardDate;
	}

	if (!product) {
		console.log(product)
		getProductInfo(props.productId, setProduct)
	}

	if (!bids){
		getProductBidInfo(props.productId, setBids)
	}

	if (product && bids) {
		console.log(bids)
		return (
			<ExpansionPanel expanded={props.productId === props.open} onChange={handleChange}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Grid container>
						<Grid item xs={8}>
							<Typography className={classes.heading}>{product.name}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Fade in={props.productId !== props.open && !accepted} unmountOnExit mountOnEnter>
								<Typography className={classes.secondaryHeading}>$ {bids.highestBid}</Typography>
							</Fade>
							<Fade in={accepted} unmountOnExit mountOnEnter>
								<Typography className={classes.accept}>Accepted</Typography>
							</Fade>
						</Grid>
					</Grid>
				</ExpansionPanelSummary>
				<Divider />
				{
					!accepted ?
						<ExpansionPanelDetails className={classes.details}>
							<List className={classes.bid} style={{ width: '100%' }}>
								{
									Object.keys(bids)
										.filter((key) => { return key === "highestBid" ? false : true })
										.sort((a,b)=>{return bids[b].price - bids[a].price})
										.map(bid =>
											<MenuItem selected={selected === bid} button key={bid} onClick={() => { setSelected(bid) }}>
												<Grid container alignItems="center">
													<Grid item container alignItems="center" xs={9}>
														<Grid item><Radio checked={selected === bid} /></Grid>
														<Grid item xs><Typography className={classes.heading}>Bid on {getDate(bids[bid].time)}</Typography></Grid>
													</Grid>
													<Grid item xs={3}>
														<Typography align='right' className={classes.secondaryHeading}>$ {bids[bid].price}</Typography>
													</Grid>
												</Grid>
											</MenuItem>
										)
								}
							</List>
						</ExpansionPanelDetails> : <ExpansionPanelDetails><BuyerInfo /></ExpansionPanelDetails>
				}
				{
					!accepted ?
						<ExpansionPanelActions>
							<Button onClick={handleAccept} className={classes.accept} disabled={selected === null}>Accept Bid</Button>
						</ExpansionPanelActions> : null
				}
			</ExpansionPanel>
		)
	} else {
		return null
	}
}

export default BidItem
