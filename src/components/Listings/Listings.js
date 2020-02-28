import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import BidItem from './BidItems';

const Listings = props => {
	const [open, setOpen] = React.useState(null)
	if (props.productIds) {
		return (
			<div>
				<Container>
					<Typography variant="h5" gutterBottom>Your Listings</Typography>
				</Container>
				<Container>
					{
						props.productIds.map(productId => {
							return <BidItem key={productId} productId={productId} open={open} setOpen={setOpen} />
						})
					}
				</Container>
			</div>
		);
	} else {
		return null
	}
}

export default Listings