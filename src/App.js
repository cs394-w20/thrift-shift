import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import TopAppBar from './components/TopAppBar'
import { firebaseInit, updateUserState } from './utils/FirebaseAuthUtils'
import './App.css';

firebaseInit()

const App = () => {
  const [user, setUser] = useState(null)

  // Change user state when the user successfully logged in
  useEffect(() => {
		updateUserState(setUser);
    console.log("test");
  }, []);

  return (
    <Container disableGutters>
      <TopAppBar user={user}/>
    </Container>
  );
}

export default App;
