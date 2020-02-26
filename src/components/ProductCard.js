import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea } from "@material-ui/core";
import { getProductInfo } from '../utils/FirebaseDbUtils'
import { getProductImage } from '../utils/FirebaseStorageUtils'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ProductCard = ({ productId }) => {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      getProductInfo(productId, setProduct)
    }
  }, []);

  if (!imageURL && product) {
    getProductImage(product.imageId, setImageURL);
  }

  if (product && imageURL) {
    return (
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageURL} title="item"/>
          <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="subtitle2">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align="right"
                color="secondary"
              >
                ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return null;
  }
};

export default ProductCard;
