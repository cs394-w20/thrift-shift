import React, { useState } from 'react';
import { Button, ListItem, List, InputLabel, FormControl, DialogActions, OutlinedInput, InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ImageUploader from 'react-images-upload';

const ItemForm = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        amout: '',
    });
    const [image, setImage] = useState(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
		setOpen(false);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleImage = (photo) => {
        setImage(photo);
    };

    const addItem = () => {
        setOpen(false);
    };
    
    return(
        <div style={{textAlign: "center"}}>
            <AddCircleOutlineIcon style={{color: "gray", fontSize: 50, marginTop: "100px"}}/>
            <br/>
            <Button size='small' color='primary' onClick={handleClickOpen} variant="contained">
                Add an item
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' >
                <DialogTitle id='alert-dialog-title'>Add an Item to Sell</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <TextField label="Item Name" value={values.name} variant="outlined" onChange={handleChange('name')} />
                        </ListItem>
                        <ListItem>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={handleImage}
                                    accept="image/*"
                                    maxFileSize={5242880}
                                    singleImage={true}
                                />
                        </ListItem>
                        <ListItem>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Amount</InputLabel>
                                <OutlinedInput
                                    value={values.amount}
                                    onChange={handleChange('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    labelWidth={60}
                                />
                        </FormControl>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={() => {addItem()}}>Submmit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ItemForm