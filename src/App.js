import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo, getAllProductInfo, getRole } from "./utils/FirebaseDbUtils";
import "./App.css";
import Listings from "./components/Listings/Listings";
import YourBids from "./components/YourBids/YourBids";
import LoginDialog from './components/LoginDialog';
import {Startup} from './components/Startup/Startup'


const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [page, setPage] = React.useState('product');

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if (user) {
      getRole(user.uid, setUserRole);
    }
  }, [user, userRole]);

  useEffect(() => {
    if (userRole) {
      if (userRole === "buyer" ) {
        getAllProductInfo(setProductIds)
      }
      if (userRole === "seller") {
        getUserProductsInfo(user.uid, setProductIds)
      }
    }
  }, [userRole]);

  if(!user){
    return(
      <Startup/>
    )
  }

  return (
    <Container disableGutters>
      <TopAppBar user={user} userRole={userRole} setPage={setPage} />
      <div style={{ height: '10px' }} />
      {
        (user && !userRole) ?
          <LoginDialog user={user} setUserRole = {setUserRole} /> : null
      }

      {
        page === 'product' ?
          <div>
            <ItemForm userRole={userRole} />
            <ProductList productIds={productIds} user={user} userRole={userRole} setPage={setPage} />
          </div> : null
      }
      {
        page === 'bid' && userRole === 'seller' ?
          <Listings productIds={productIds} setPage={setPage} /> : null
      }
      {
        page === 'bid' && userRole === 'buyer' ?
          <YourBids setPage={setPage}/> : null
      }
    </Container>
  );
};

export default App
