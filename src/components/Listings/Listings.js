import React from "react";
import Typography from "@material-ui/core/Typography";
import { Container, Button } from "@material-ui/core";
import BidItem from "./BidItems";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    color: "#707070",
		fontSize: "23px",
    textAlign: "center",
    fontFamily: "Proxima Nova, sans-serif",
    marginTop: "20%"
  },
  inventoryButton: {
    backgroundColor: "#67A6FC",
    fontFamily: "Proxima Nova, sans-serif",
    fontSize: "17px",
    height: "40px",
    color: "white",
    marginTop: "7%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

const Listings = props => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(null);
	
	const inventory = () => {
    props.setPage('product')
	}
	
  if (props.productIds) {
    return (
      <div>
        <Container>
          <Typography variant="h5" gutterBottom>
            Your Listings
          </Typography>
        </Container>
        <Container>
          {props.productIds.map(productId => {
            return (
              <BidItem
                key={productId}
                productId={productId}
                open={open}
                setOpen={setOpen}
              />
            );
          })}
        </Container>
      </div>
    );
  } else {
    return (
      <Container>
        <p className={classes.text}>
          Your listings have no active bids. <br /> 
					View your active listings in Inventory.
        </p>
        <Button
          variant="contained"
          className={classes.inventoryButton}
          onClick={inventory}
        >
          Inventory
        </Button>
      </Container>
    );
  }
};

export default Listings;
