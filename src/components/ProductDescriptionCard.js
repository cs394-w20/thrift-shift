import {React, useState, useEffect} from "react";
import "rbx/index.css";
import { getProductInfo } from '../utils/FirebaseDbUtils'
import { getProductImage, ProductCard} from ''
import firebase from "firebase/app";
import {
    Dialog,
	DialogContent,
    DialogTitle,
    DialogActions
} from '@material-ui/core';
import "firebase/storage";
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea } from "@material-ui/core";


const ProductDescriptionCard = (productId) => {

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

      if(imageURL && product){
          return(
              <Card>
                  <CardActionArea>
                    <title>{product.name}</title>
                    <CardMedia className={classes.media} image={imageURL} title="item"/>
                    <CardContent>
                        <h2>Starting Price  {product.price}</h2>
                        <h4>{product.description}</h4>
                    </CardContent>
                  </CardActionArea>
              </Card>

          )
      }

}

export default ProductDescriptionCard