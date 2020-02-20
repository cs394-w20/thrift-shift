import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState, database } from "./utils/FirebaseAuthUtils";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [productIDs, setProductIDs] = useState(null);

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, []);

  useEffect(() => {
    const getProductInfo = snapshot => {
      if (snapshot.val()) {
        let productIdArr = Object.keys(snapshot.val());
        setProductIDs(productIdArr);
      }
    };
    const userProductDb = database.ref("Users/UserID/Products");
    userProductDb.on("value", getProductInfo, error => alert(error));
  }, []);

  return (
    <Container disableGutters>
      <TopAppBar user={user} />
      <ItemForm />
      <ProductList productIDs={productIDs} />
    </Container>
  );
};

export default App;
