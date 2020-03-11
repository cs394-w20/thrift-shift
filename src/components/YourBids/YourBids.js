import React from "react";
import Typography from "@material-ui/core/Typography";
import { Container, Button } from "@material-ui/core";
import { getBuyerBid } from "../../utils/FirebaseDbUtils";
import { getUser } from "../../utils/FirebaseAuthUtils";
import BuyerBid from "./BuyerBid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    color: "#707070",
		fontSize: "24px",
    textAlign: "center",
    fontFamily: "Proxima Nova, sans-serif",
    marginTop: "20%"
  },
  browseButton: {
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

const YourBids = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const [bidIds, setBidIds] = React.useState(null);

  React.useEffect(() => {
    getBuyerBid(getUser().uid, setBidIds);
  }, []);

  const browse = () => {
    props.setPage('product')
  }

  if (bidIds) {
    return (
      <div>
        <Container>
          <Typography variant="h5" gutterBottom>
            Your Bids
          </Typography>
        </Container>
        <Container>
          {Object.values(bidIds).map(bidId => {
            return (
              <BuyerBid
                key={bidId}
                bidId={bidId}
                open={open}
                setOpen={setOpen}
                setPage={props.setPage}
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
          You have not made any bids yet. <br />
					Return to browse to make a bid.
        </p>
        <Button variant="contained" className={classes.browseButton} onClick={browse} >Browse</Button>
      </Container>
    );
  }
};

export default YourBids;
