import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { getBuyerBid } from '../../utils/FirebaseDbUtils'
import { getUser } from '../../utils/FirebaseAuthUtils'
import BuyerBid from './BuyerBid';

const YourBids = props => {
  const [open, setOpen] = React.useState(null)
  const [bidIds, setBidIds] = React.useState(null)

  React.useEffect(()=>{
    getBuyerBid(getUser().uid, setBidIds)
  }, [])

	if (bidIds) {
		return (
			<div>
				<Container>
					<Typography variant="h5" gutterBottom>Your Bids</Typography>
				</Container>
				<Container>
					{
						Object.values(bidIds).map(bidId => {
							return <BuyerBid key={bidId} bidId={bidId} open={open} setOpen={setOpen} />
						})
					}
				</Container>
			</div>
		);
	} else {
		return null
	}
}

export default YourBids