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
import "../App.css";
import { getProductInfo, addBid } from "../utils/FirebaseDbUtils";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const MakeBidDialog = ({ user, userRole, productId }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    if (productId) {
      getProductInfo(productId, setProduct);
    }
  }, []);

  const handleClickOpen = () => {
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
    setBidAmount("");
  };

  const handleChangeBid = event => {
    const newAmount = event.target.value;
    setBidAmount(newAmount);
  };

  const submitBid = () => {
    addBid(user.uid, productId, product, bidAmount);
    setOpen(false);
    setBidAmount("");
  };

  if (product && user && userRole === "buyer") {
    return (
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          color="secondary"
          aria-label="edit"
        >
          Make Bid
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">Make a Bid</DialogTitle>
          <ValidatorForm
            onSubmit={() => {
              submitBid();
            }}
          >
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
              <Button variant="contained" color="secondary" type="submit">
                Submit Bid
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
};

export default MakeBidDialog;
