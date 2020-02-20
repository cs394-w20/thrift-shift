import React from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container } from "@material-ui/core";

const ProductList = ({ productIds }) => {
  console.log(productIds)
  if (productIds) {
    return (
      <Container>
        <Grid container spacing={2} justify="center">
          {
            productIds.map(productId => {
              return (
                <Grid key={productId} item xs={6} md={3}>
                  <ProductCard productId={productId} />
                </Grid>
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
