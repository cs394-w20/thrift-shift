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
      <Container>
        <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
          <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '25%' }}>Looks like theres nothing here! </h2>
          <img src='closet.png' alt='closet' style={{ height: '20%', left: '50%', marginTop: '10%' }}></img>
          {userRole === 'seller' ?
            <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '10%' }}>Add a new item by hitting the upload button below. </h2>
            : null}
        </div>
      </Container>
    );
  }
};
export default ProductList;
