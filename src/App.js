import React, { useState, useEffect } from 'react';
import { updateUserState } from './utils/FirebaseAuthUtils'
import { Container } from '@material-ui/core';
import TopAppBar from './components/TopAppBar';
import ItemForm from './components/ItemForm';
import ProductCard from './components/ProductCard';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null)

  // Change user state when the user successfully logged in
  useEffect(() => {
		updateUserState(setUser);
  }, []);

  return (
    <Container disableGutters>
      <TopAppBar user={user}/>
      <ItemForm />
    </Container>
  );
}

export default App;
