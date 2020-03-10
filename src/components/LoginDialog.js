import React, { useState, useEffect } from 'react';
import {
  ListItem,
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { setUserProfile, getRole } from "../utils/FirebaseDbUtils";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';



const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)',
    boxShadow: '0',
  },
  titleText: {
    textAlign: 'center'
  },
  thriftText: {
    display: 'inline-block', 
    fontFamily: 'Gill Sans', 
    fontWeight: '600', 
    color: 'white', 
    letterSpacing: '4px'
  },
  shiftText: {
    display: 'inline-block', 
    fontFamily: 'Gill Sans', 
    fontStyle: 'italic', 
    color: 'white', 
    letterSpacing: '4px', 
    fontWeight: "300"
  }
});

const LoginDialog = ({ user, setUserRole }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [role, setRole] = useState('seller');
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      setOpen(true);
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
    getRole(user.uid, setUserRole)
    handleClose();
  }

  return (

    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        },
      }}
      className={classes.root}
      fullScreen={fullScreen}
    >
      <ValidatorForm
        onSubmit={() => { submitForm(); }}
      >
        <DialogTitle id="simple-dialog-title">
          <div>
            <h1 className={classes.titleText}> 
              <div className={classes.thriftText}>THRIFT</div>
              <div className={classes.shiftText}> SHIFT</div>
            </h1>
          </div>
        </DialogTitle>
        <DialogContent>
          <ListItem>
            <div>
              <img src='logo.png'></img>
            </div>
          </ListItem>
          <ListItem>
            <p style={{ color: 'white' }}>Welcome {user.displayName}! Are you interested in selling your items to local thrift stores, or are you a store owner looking to buy?</p>
          </ListItem>

          <ListItem style={{ color: "white" }}>
            <TextValidator
              label="Name"
              value={profile.name}
              validators={["required"]}
              errorMessages={["This field is required"]}
              onChange={handleChange("name")}
              style={{ color: "white" }}
            />
          </ListItem>
          <ListItem style={{ color: "white" }}>
            <TextValidator
              label="Email Address"
              value={profile.email}
              validators={["required"]}
              errorMessages={["This field is required"]}
              style={{ color: "white" }}
              onChange={handleChange("email")}
            />
          </ListItem>
          <ListItem style={{ color: "white" }}>
            <TextField label="Address" value={profile.address} onChange={handleChange('address')} style={{ color: "white" }} />
          </ListItem>
          <ListItem style={{ color: "white" }}>
            <RadioGroup aria-label="gender" name="gender1" value={profile.role} onChange={handleChange('role')}>
              <FormControlLabel value="seller" control={<Radio />} label="I'm a Seller" style={{ color: 'white' }} />
              <FormControlLabel value="buyer" control={<Radio />} label="I'm a Buyer" />
            </RadioGroup>
          </ListItem>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
        </Button>
        </DialogActions>
      </ValidatorForm>

    </Dialog>
  )

}

export default LoginDialog;
