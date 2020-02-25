import React, { useState } from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container, Slide } from "@material-ui/core";
import ProductDescriptionCard from './ProductDescriptionCard'

const ProductList = ({ productIds }) => {
  console.log(productIds);
  const [showDetailpage, setShowDetailPage] = useState(true);
  const [selectProductId, setSelectProductId] = useState(null);

  const handleSelectProduct = (productId) => {
    setShowDetailPage(true);
    setSelectProductId(productId);
  }

  if (productIds) {
    return (
      <Container>
        <Slide direction="left" in={!showDetailpage} mountOnEnter unmountOnExit>
          <Grid container spacing={2}>
            {
              productIds.map(productId => {
                return (
                  <Grid onClick={() => { handleSelectProduct(productId) }} key={productId} item xs={6} md={3}>
                    <ProductCard productId={productId} />
                  </Grid>
                );
              })
            }
          </Grid>
        </Slide>
        <Slide direction="right" in={showDetailpage} mountOnEnter unmountOnExit>
          <div>
            <ProductDescriptionCard
              productId = "-M0YcPi3AThWJbpteAtj"
              open = {showDetailpage}
              setOpen = {setShowDetailPage}
            />
          </div>
        </Slide>
      </Container>
    );
  } else {
    return null;
  }
};
export default ProductList;
