import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  InputAdornment,
  DialogTitle
} from "@material-ui/core";
import "../../App.css";
import { changeBid } from "../../utils/FirebaseDbUtils";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  alertDialogTitle: {
    textAlign: "center"
  },
  bidSubmittedText: {
    color: "green"
  },
  submittedButtons: {
    justifyContent: "center"
  }
});

const ChangeBidDialog = ({
  user,
  bidId,
  product,
  productId,
  setPage
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidSubmitted, setBidSubmitted] = useState(false);


  const handleClickOpen = () => {
    setBidSubmitted(false);
    setBidAmount("");
    setOpen(true);
    ValidatorForm.addValidationRule("belowHighestBid", value => {
      value = Number(value);
      if (product && product.bid && value <= product.bid.highestBid) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("belowStartingPrice", value => {
      value = Number(value);
      if ((!product || !product.bid) && value < product.price) {
        return false;
      }
      return true;
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeBid = event => {
    const newAmount = event.target.value;
    setBidAmount(newAmount);
  };

  const submitBid = () => {
    changeBid(bidId, bidAmount, productId)
    setBidSubmitted(true);
  };

  const viewBidListings = () => {
    setOpen(false);
    setPage("bid");
  };

  const keepShopping = () => {
    setOpen(false);
    setPage("product");
  };

    return (
      <div>
        <Button
          style = {{color : '#67A6FC'}}
          onClick={handleClickOpen}
          aria-label="edit"
        >
          Change Bid
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          {bidSubmitted ? (
            <DialogTitle
              id="alert-dialog-title"
              className={classes.alertDialogTitle}
            >
              <strong className={classes.bidSubmittedText}>
                Bid Submitted
              </strong>
            </DialogTitle>
          ) : (
            <DialogTitle id="alert-dialog-title">Make a Bid</DialogTitle>
          )}
          <ValidatorForm
            onSubmit={() => {
              submitBid();
            }}
          >
            <DialogContent>
              <Grid container spacing={2}>
                {bidSubmitted ? null : (
                  <Grid item xs={12} sm={12} container>
                    <Grid item xs>
                      Current Highest Bid
                    </Grid>
                    <Grid item xs>
                      $ {product.bid ? product.bid.highestBid : "--"}
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} container>
                  <Grid item xs>
                    Your Bid
                  </Grid>
                  <Grid item xs>
                    {bidSubmitted ? (
                      <p>$ {bidAmount}</p>
                    ) : (
                      <TextValidator
                        value={bidAmount}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                        onChange={handleChangeBid}
                        InputLabelProps={{
                          shrink: true
                        }}
                        validators={[
                          "required",
                          "matchRegexp:^[0-9]*$",
                          "belowHighestBid",
                          "belowStartingPrice"
                        ]}
                        errorMessages={[
                          "This field is required",
                          "Invalid number",
                          "Your bid must be greater than the highest bid",
                          "Your bid must be at least the starting price"
                        ]}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            {bidSubmitted ? (
              <DialogActions>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    className={classes.submittedButtons}
                  >
                    <Button
                      onClick={() => {
                        keepShopping();
                      }}
                      variant="contained"
                      style = {{background: '#67A6FC', color: 'white'}}
                    >
                      Keep Shopping
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    container
                    className={classes.submittedButtons}
                  >
                    <Button
                      onClick={() => {
                        viewBidListings();
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      View My Bids
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            ) : (
              <DialogActions>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" style = {{background: '#67A6FC', color: 'white'}} type="submit">
                  Submit Bid
                </Button>
              </DialogActions>
            )}
          </ValidatorForm>
        </Dialog>
      </div>
    );
};

export default ChangeBidDialog;
