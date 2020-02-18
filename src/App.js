import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import TopAppBar from './components/TopAppBar'
import ItemForm from './components/ItemForm'
import { firebaseInit, updateUserState } from './utils/FirebaseAuthUtils'
import './App.css';

firebaseInit()

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
