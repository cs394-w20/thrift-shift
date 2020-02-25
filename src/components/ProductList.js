import React, { useState } from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container } from "@material-ui/core";
import {ProductDescriptionCard} from './ProductDescriptionCard'

const ProductList = ({ productIds }) => {
  const [showDetailpage, setShowDetailPage] = useState(false);

  const handleClickProduct = () => {
    setShowDetailPage(true);
  }

  if (productIds) {
    return (
      <Container>

        <div style={{height:'10px'}}></div>
        <Grid container spacing={2}>
          {
            productIds.map(productId => {
              return (
                <div>
                <ProductDescriptionCard
                productId = {productId}
                />
                <Grid onClick={() => { handleClickProduct() }} key={productId} item xs={6} md={3}>
                  <ProductCard productId={productId} />
                </Grid>
                </div>
              );
            })
          }
        </Grid>
      </Container>
    );
  } else {
    return null;
  }
};
export default ProductList;
