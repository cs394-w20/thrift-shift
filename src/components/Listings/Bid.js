import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Grid, Typography, Radio } from '@material-ui/core'
import { getBidInfo } from '../../utils/FirebaseDbUtils'

const useStyles = makeStyles(theme => ({
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: "red"
	},
}));

const Bid = props => {
  const classes = useStyles()
  const [bid, setBid] = React.useState(null)

  useEffect(() => {
    getBidInfo(props.bidId, setBid)
  }, [])

  if (bid) {
    return (
      <MenuItem selected={props.selected === props.bidId} button key={props.bidId} onClick={() => { props.setSelected(props.bidId) }}>
        <Grid container alignItems="center">
          <Grid item container alignItems="center" xs={9}>
            <Grid item><Radio checked={props.selected === props.bidId} /></Grid>
            <Grid item xs><Typography className={classes.heading}>{bid.buyerName}</Typography></Grid>
          </Grid>
          <Grid item xs={3}>
            <Typography align='right' className={classes.secondaryHeading}>$ {bid.price}</Typography>
          </Grid>
        </Grid>
      </MenuItem>
    )
  } else {
    return null
  }
}

export default Bid