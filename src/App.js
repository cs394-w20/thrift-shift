import React, { useState, useEffect } from "react";
import { Container,Dialog, DialogTitle} from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo, getAllProductInfo, addRole, getRole} from "./utils/FirebaseDbUtils"

import "./App.css";
import { render } from "@testing-library/react";

const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [allProductId, setAllProductId] = useState(null);
  const[open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  };

  const chooseRole = () => {
    setOpen(true)
    render (
      <Dialog
        open = {open}
        onClose={handleClose}
      >
      <DialogTitle id="simple-dialog-title">Choose Your Role</DialogTitle>
      </Dialog>
        
    )
  }

  useEffect(() => {
    if (user && userRole === null) {
      console.log("Empty");
      chooseRole();
    }
  }, [userRole, open, user])
  

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if(user){
      
      getRole(user.uid,setUserRole)
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
