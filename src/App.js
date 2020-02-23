import React, { useState, useEffect } from "react";
import { Container,Dialog, DialogTitle, Button} from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo, getAllProductInfo, addRole, getRole} from "./utils/FirebaseDbUtils"
import "./App.css";


const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [allProductId, setAllProductId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
  };

  const ChooseRole = ({user}) => {
    return (
      <Dialog
        open = {open}
        onClose={handleClose}
      >
      <DialogTitle id="simple-dialog-title" style = {{textAlign: 'center'}}>Choose Your Role</DialogTitle>
      <Button variant="contained" color="primary" style = {{width: '50%', marginLeft: '25%'}} onClick = {() => {addRole(user.uid, "seller"); getRole(user.uid, setUserRole); handleClose()}}>
        Seller
      </Button>
      <Button variant="contained" color="primary" style = {{marginTop: '5px', marginBottom: '5px', width: '50%',  marginLeft: '25%'}} onClick = {() => {addRole(user.uid, "buyer"); getRole(user.uid, setUserRole); handleClose()}}>
        Buyer
      </Button>
      </Dialog> 
    )
  }

    // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if(user){

      //getRole(user.uid,setUserRole)
      setOpen(true)
      getUserProductsInfo(user.uid, setProductIds)
    }
  }, [user]);
  
  return (
    <Container disableGutters>
      <ChooseRole user={user}/>
      <TopAppBar user={user} />
      <ItemForm />
      <ProductList productIds={productIds} />
    </Container>
  );
};

export default App;
