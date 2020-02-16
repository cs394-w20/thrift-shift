import React, { useState } from "react";
import "rbx/index.css";
import { Image } from "rbx";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/storage";

const getProductImage = (image_id, setImageURL) => {
  // Get image reference
  const imageRef = firebase.storage().ref(`${image_id}.jpg`);

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

const ProductCard = ({ product }) => {
  const [imageURL, setImageURL] = useState(null);

  if (!imageURL) {
    getProductImage("lizard", setImageURL);
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Image src={imageURL} />
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="h2" align="right">
              $30.00
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
