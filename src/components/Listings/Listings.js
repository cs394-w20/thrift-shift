import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import BidItem from './BidItems';

const Listings = props => {

	if (props.productIds) {
		return (
			<Container>
				<Typography variant="h5" gutterBottom>Your Listings</Typography>
				{
					props.productIds.map(productId => {
						return <BidItem key={productId} productId={productId} />
					})
				}
			</Container>
		);
	} else{
		return null
	}
}

export default Listings