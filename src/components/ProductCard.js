import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea } from "@material-ui/core";
import { getProductInfo } from '../utils/FirebaseDbUtils'
import { getProductImage } from '../utils/FirebaseStorageUtils'
import ProductDescriptionCard from './ProductDescriptionCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ProductCard = props => {
  const classes = useStyles();
  const [imageURL, setImageURL] = useState(null);
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.productId) {
      getProductInfo(props.productId, setProduct);
    }
  }, []);

  if (!imageURL && product) {
    getProductImage(product.imageId, setImageURL);
  }

  if (product && imageURL) {
    if (product.sold) {
      return null;
    }
    return (
      <Grid key={props.productId} item xs={6} md={3}>
        <Card onClick={() => setOpen(true)}>
          <CardActionArea>
            <CardMedia className={classes.media} image={imageURL} title="item" />
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
        <ProductDescriptionCard
          product={product}
          productId={props.productId}
          imageURL={imageURL}
          open={open}
          setOpen={setOpen}
          user={props.user}
          userRole={props.userRole}
          setPage={props.setPage}
        />
      </Grid>
    );
  } else {
    return null;
  }
};

export default ProductCard;
