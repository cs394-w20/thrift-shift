import React, { useState } from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container, Slide, Button } from "@material-ui/core";
import ProductDescriptionCard from './ProductDescriptionCard';
import MakeBidDialog from "./MakeBidDialog";

const ProductList = ({ productIds, user, userRole }) => {
  console.log(productIds);
  const [showDetailpage, setShowDetailPage] = useState(false);
  const [selectProductId, setSelectProductId] = useState(null);

  const handleSelectProduct = (productId) => {
    setShowDetailPage(true);
    setSelectProductId(productId);
  }

  if (productIds && productIds.length > 0) {

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
              productId = {selectProductId}
              open = {showDetailpage}
              setOpen = {setShowDetailPage}
              user = {user}
              userRole = {userRole}
            />
          </div>
        </Slide>
      </Container>
    );
  } else {
    return (
      <div style={{textAlign:'center',height:'100vh', width:'100vw',alignItems:'center'}}>
        <img src='bookshelf.png' style={{height:'200px',left:'50%',top:'50%'}}></img>
        <br />
        There is nothing here<br />
        Add an item to start
      </div>
    );
  }
};
export default ProductList;
