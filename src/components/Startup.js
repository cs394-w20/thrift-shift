import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, useScrollTrigger, CssBaseline, Avatar, Button, Grid } from '@material-ui/core';
import { signInWithGoogle } from '../utils/FirebaseAuthUtils';

const Startup = () => {
  return(
  <div style = {{height: '100%', marginTop: '-5%', width: '100%', background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)'}}>
   <div>
    <h1 style = {{marginTop: '50%' , textAlign: 'center'}}> <div style={{fontSize: '40px',display: 'inline-block', fontFamily:'Gill Sans Nova', fontWeight: 'bolder', color:'white', letterSpacing:'4px'}}> 
          THRIFT
          </div>
          <div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontStyle: 'italic', color:'white', letterSpacing:'4px', fontSize: '40px', fontWeight: "100"}}> SHIFT</div>
    </h1>
    </div>
    <div>
          <img src='logo.png' style = {{mixBlendMode: 'multiply'}}></img>
    </div>
    
    <Button
          variant="contained"
          type="submit"
          style={{background: '#67A6FC' , marginTop: '10%', color: 'white', width: '30%', marginLeft: '35%'}}
          onClick ={signInWithGoogle}
        > Sign In 
        </Button>
    
    </div>
  );
}

export {Startup}