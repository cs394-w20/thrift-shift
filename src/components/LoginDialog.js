import React, { useState, useEffect } from 'react';
import {
  ListItem,
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { addRole, setUserProfile } from "../utils/FirebaseDbUtils";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const LoginDialog = ({ user }) => {
  const [role, setRole] = useState('seller');
  const [open, setOpen] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName,
        email: user.email,
        address: '',
        role: 'seller'
      })
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = prop => event => {
    setProfile({ ...profile, [prop]: event.target.value });
  };

  const submitForm = () => {
    setUserProfile(user.uid, profile);
    handleClose();
  }

  return (
    <Dialog
      open={open}
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center'}}>Choose Your Role</DialogTitle>
      <ListItem>
        <TextField label="Name" value={profile.name} onChange={ handleChange('name') } />
      </ListItem>
      <ListItem>
        <TextField label="Email Address" value={profile.email} onChange={ handleChange('email') } />
      </ListItem>
      <ListItem>
        <TextField label="Address" value={profile.address} onChange={ handleChange('address') } />
      </ListItem>
      <ListItem>
        <RadioGroup aria-label="gender" name="gender1" value={profile.role} onChange={handleChange('role')}>
          <FormControlLabel value="seller" control={<Radio />} label="I'm a Seller" />
          <FormControlLabel value="buyer" control={<Radio />} label="I'm a Buyer" />
        </RadioGroup>
      </ListItem>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '5px', marginBottom: '5px', width: '50%', marginLeft: '25%' }}
        onClick={() => { submitForm() }}
      >
        Submit
      </Button>
    </Dialog>
  )
}

export default LoginDialog;
