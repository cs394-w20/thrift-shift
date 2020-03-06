import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getBidInfoWithProduct, verifyBid, alterBuyerNotificationCount } from '../../utils/FirebaseDbUtils'
import { Divider, Grid, List, ExpansionPanelActions, Button, Fade } from '@material-ui/core';
import { getUser } from '../../utils/FirebaseAuthUtils';

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
}));

const BuyerBid = props => {
  const classes = useStyles();
  const [bid, setBid] = React.useState(null)

  const handleChange = () => {
    if(bid.status && (bid.status === 'Accepted')){
      verifyBid(props.bidId)
      alterBuyerNotificationCount(getUser().uid, false)
    }
		if (props.open === props.bidId) {
			props.setOpen(null)
		} else {
			props.setOpen(props.bidId)
		}
	}

  React.useEffect(()=>{
    getBidInfoWithProduct(props.bidId, setBid)
  }, [])

  if (bid) {
    return (
      <ExpansionPanel expanded={props.bidId === props.open} onChange={handleChange}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={8}>
              <Typography className={classes.heading}>{bid.product.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.secondaryHeading}>{bid.status && (bid.status === 'Accepted' || bid.status==='Verified') ? 'Accepted' : '$' + bid.price}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelActions>
          <Button color='secondary'>Delete Bid</Button>
          <Button color='primary'>Change Bid</Button>
        </ExpansionPanelActions>
			</ExpansionPanel>
    )
  } else {
    return null
  }
}

export default BuyerBid
