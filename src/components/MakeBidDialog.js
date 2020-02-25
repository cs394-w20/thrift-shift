import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import { getProductInfo, addBid } from "../utils/FirebaseDbUtils";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const MakeBidDialog = ({ user, userRole }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const productId = "-M0VrbmAEtpmzGsJOWQJ";

  useEffect(() => {
    if (productId) {
      getProductInfo(productId, setProduct);
    }
  }, []);

  const handleClickOpen = () => {
    if (product) {
      if (product.bid) {
        setBidAmount(product.bid.highestBid);
      } else if (bidAmount == 0) {
        setBidAmount(product.price);
      }
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeBid = event => {
    setBidAmount(event.target.value);
  };

  const submitBid = () => {
    console.log("made bid", bidAmount);
    addBid(user.uid, productId, product, bidAmount);
    setOpen(false);
  };

  if (product && user && userRole == "buyer") {
    console.log("bid amount", bidAmount);
    return (
      <div>
        <Button
          variant="extended"
          onClick={handleClickOpen}
          color="secondary"
          aria-label="edit"
          className={classes.root}
        >
          Make Bid
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Make a Bid</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                Current Highest Bid
              </Grid>
              <Grid item xs={6}>
                $ {product.bid ? product.bid.highestBid : "--"}
              </Grid>
              <Grid item xs={6}>
                Your Bid
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-number"
                  type="number"
                  value={bidAmount}
                  onChange={handleChangeBid}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                submitBid();
              }}
            >
              Submit Bid
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
};

export default MakeBidDialog;
