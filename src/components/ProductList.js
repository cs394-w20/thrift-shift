import React from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container } from "@material-ui/core";


const ProductList = ({ productIds, user, userRole, setPage }) => {
  if (productIds && productIds.length > 0) {
    return (
      <Container>
        <Grid container spacing={2}>
          {
            productIds.map(productId => {
              return (

                  <ProductCard productId={productId} user={user} userRole={userRole} setPage={setPage} />

              );
            })
          }
        </Grid>
      </Container>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', height: '100vh', width: '100vw', alignItems: 'center' }}>
        <img src='bookshelf.png' style={{ height: '200px', left: '50%', top: '50%' }}></img>
        <br />
        There is nothing here<br />
        Add an item to start
      </div>
    );
  }
};
export default ProductList;
