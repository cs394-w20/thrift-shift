import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { Image } from "rbx";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import { getProductInfo } from '../utils/FirebaseDbUtils'
import firebase from "firebase/app";
import "firebase/storage";

const getProductImage = (image_id, setImageURL) => {
  // Get image reference
  const imageRef = firebase.storage().ref("product_images/" + image_id);

  // Get the download URL
  imageRef
    .getDownloadURL()
    .then(function(url) {
      setImageURL(url);
    })
    .catch(function(error) {
      console.log("error", error);
    });
};

const ProductCard = ({ productId }) => {
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
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Image src={imageURL} />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="right"
              >
                ${product.price}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
};

export default ProductCard;
