import React, { useState, useEffect } from "react";
import { Container, Dialog, DialogTitle, Button } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import {Select, MenuItem, ListItem, List, FormControl, InputLabel, DialogActions } from '@material-ui/core';
import ProductList from "./components/ProductList";
import { updateUserState, updateAddress} from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo, getAllProductInfo, addRole, getRole, addUserInfo, addAddress, getAddress} from "./utils/FirebaseDbUtils"
import "./App.css";
import Listings from "./components/Listings/Listings";
import TextField from '@material-ui/core/TextField';


const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState('product')
  const [address, setAddress] = useState('')

  const handleClose = () => {
    setOpen(false)
  };
  const handleAddress = event => {

    setAddress(event.target.value)
  }

  const ChooseRole = ({ user }) => {
    var name = ""
    var email = ""
    var temp = ""
    if(user){
      name = user.displayName
      email = user.email
    }
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center'}}>Choose Your Role</DialogTitle>
        <ListItem>
        <TextField label="Name" value={name}/>
        </ListItem>
        <ListItem>
        <TextField label="Email Address" value={email}/>
        </ListItem>
        <ListItem>
        <TextField label="Address" value={address} onChange={handleAddress}/>
        </ListItem>
        <Button variant="contained" color="primary" style={{ marginTop: '5px', width: '50%', marginLeft: '25%' }} onClick={() => { addRole(user.uid, "seller"); getRole(user.uid, setUserRole)}}>
          Seller
      </Button>
        <Button variant="contained" color="primary" style={{ marginTop: '5px', marginBottom: '5px', width: '50%', marginLeft: '25%' }} onClick={() => { addRole(user.uid, "buyer"); getRole(user.uid, setUserRole)}}>
          Buyer
      </Button>
      <Button variant="contained" color="primary" style={{ marginTop: '5px', marginBottom: '5px', width: '50%', marginLeft: '25%' }} onClick={() => {handleClose(); addAddress(user.uid, address)}}>
          Submit
      </Button>
      </Dialog>
    )
  }

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
    if (user && !userRole) {
      setOpen(true);
      addUserInfo(user);
    }
  });

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
      <ChooseRole user={user} />
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
