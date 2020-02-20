import React from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

const ProductList = ({ productIDs }) => {

  if (productIDs) {
    return (
      <Grid container spacing={10} justify="center">
        {productIDs.map(productID => {
          return (
            <Grid key={productID} item xs={12} md={6}>
              <ProductCard productID={productID} />
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return null;
  }
};
export default ProductList;
