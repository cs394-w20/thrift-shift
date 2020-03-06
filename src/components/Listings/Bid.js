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
    let selected = props.selected && (props.selected.bidId === props.bidId)
    return (
      <MenuItem selected={selected} button key={props.bidId} onClick={() => { props.setSelected({bidId:props.bidId, ...bid}) }}>
        <Grid container alignItems="center">
          <Grid item container alignItems="center" xs={9}>
            <Grid item><Radio checked={selected} /></Grid>
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