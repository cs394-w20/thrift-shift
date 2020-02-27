import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from "@material-ui/core/styles";
import MakeBidDialog from "./MakeBidDialog";
import { getProductInfo } from "../utils/FirebaseDbUtils";
import { getProductImage } from "../utils/FirebaseStorageUtils";
import "firebase/storage";
import {
  Grid,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
  flexGrow: 1,
  },
  paper: {
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 500,
  },
  image: {
  width: 128,
  height: 128,
  },
  img: {
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  },
}));

const ProductDescriptionCard = ({ productId, user, userRole }) => {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      getProductInfo(productId, setProduct)
    }
  }, [productId]);

  if (!imageURL && product) {
    getProductImage(product.imageId, setImageURL);
  }

  if(imageURL && product){
    return(
      <Grid
        justify="center"
        direction="column"
        alignItems="center"
        container
        style={{ padding: "15px 10px 15px 10px" }}
        spacing={2}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sm container>
            <Grid xs item>
              <Typography variant="h5">
                {product.name}
              </Typography>
            </Grid>
            <Grid item>
              <MakeBidDialog user={user} userRole={userRole} productId={productId}/>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <img className={classes.img} alt={product.name} src={imageURL} />
          </Grid>
          <Grid item xs={12} sm={12} sm container>
            <Grid item xs container>
              <Typography gutterBottom  variant="h5">
                Starting Price
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">$ {product.price}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item xs container>
              <Typography gutterBottom  variant="h6">
                {product.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Size 2</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Typography gutterBottom  variant="body1">
              Vintage lightweight leather jacket from the 1970s. No rips or tears, in very good condition. Women’s size medium. Serious inquiries only.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}

export default ProductDescriptionCard;
