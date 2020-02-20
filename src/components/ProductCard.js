import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { Image } from "rbx";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/storage";
import { database } from "../utils/FirebaseAuthUtils";

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

const ProductCard = ({ productID }) => {
  const [imageURL, setImageURL] = useState(null);
  const [productObj, setProductObj] = useState(null);

  useEffect(() => {
    if (productID) {
      const productDb = database.ref("Products/" + productID);
      productDb.once(
        "value",
        snapshot => {
          setProductObj(snapshot.val());
        },
        error => alert(error)
      );
    }
  }, [productID]);

  if (!imageURL && productObj) {
    getProductImage(productObj.imageId, setImageURL);
  }

  if (productObj && imageURL) {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Image src={imageURL} />
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                {productObj.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="right"
              >
                ${productObj.price}
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
