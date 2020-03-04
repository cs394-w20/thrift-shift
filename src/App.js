import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState, updateAddress} from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo, getAllProductInfo, getRole } from "./utils/FirebaseDbUtils";
import "./App.css";
import Listings from "./components/Listings/Listings";
import LoginDialog from './components/LoginDialog';


const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [page, setPage] = React.useState('product')
  const [address, setAddress] = useState('')

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     getRole(user.uid, setUserRole);
  //   }
  // }, [user]);

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

  return (
    <Container disableGutters>
      <div style={{ height: '10px' }} />
      {
        (user && !userRole) ?
          <LoginDialog user={user} /> : null
      }
      <TopAppBar user={user} userRole={userRole} setPage={setPage} />
      {
        page === 'product' ?
          <div>
            <ItemForm userRole={userRole} />
            <ProductList productIds={productIds} user={user} userRole={userRole} setPage={setPage} />
          </div> : null
      }
      {
        page === 'bid' ?
          <Listings productIds={productIds} /> : null
      }
    </Container>
  );
};

export default App;
