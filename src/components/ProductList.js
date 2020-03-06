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
                <Grid key={productId} item xs={6} md={3}>
                  <ProductCard productId={productId} user={user} userRole={userRole} setPage={setPage} />
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
    );
  } else {
    return (
      <div style={{ textAlign: 'center', height: '100vh', width: '100vw', alignItems: 'center' }}>
       <h2 style = {{color: '#707070',fontSize: '24px', textAlign: 'center', fontFamily: 'Proxima Nova', marginTop:'40%'}}>Looks like theres nothing here! </h2>
        <img src='closet.png' style={{ height: '20%', left: '50%', marginTop: '10%'}}></img>
        <h2 style = {{color: '#707070',fontSize: '24px', textAlign: 'center', fontFamily: 'Proxima Nova', marginTop:'10%'}}>Add a new item by hitting the upload button below. </h2>
      </div>
    );
  }
};
export default ProductList;
