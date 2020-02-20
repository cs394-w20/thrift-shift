import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo } from "./utils/FirebaseDbUtils"
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if(user){
      getUserProductsInfo(user.uid, setProductIds)
    }
  }, [user]);
  
  return (
    <Container disableGutters>
      <TopAppBar user={user} />
      <ItemForm />
      <ProductList productIds={productIds} />
    </Container>
  );
};

export default App;
