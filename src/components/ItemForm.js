import React, { useState } from 'react';
import {
    Button,
    ListItem,
    List,
    InputLabel,
    FormControl,
    DialogActions,
    OutlinedInput,
    InputAdornment,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ImageUploader from 'react-images-upload';
import { storageRef, database, databaseRef } from '../utils/FirebaseAuthUtils';
import '../App.css';

const ItemForm = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        price: '',
        imageId: ''
    });
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
		setOpen(false);
    };

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    const handleImageUpload = (pictureFiles, pictureDataURLs) => {
        setImage(pictureFiles[0]);
    };

    const addItem = () => {
        const uuidv4 = require('uuid/v4');
        const imageId = uuidv4();
        const uploadTask = storageRef.child(`product_images/${imageId}`).put(image);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
                if (progress === 100) {
                    handleClose();
                }
            },
            error => {
                console.log(error);
            }
        );

        const newProductKey = databaseRef.child('Products').push().key;
        const updates = {};
        const product = {
            name: values.name,
            price: values.price,
            imageId: imageId
        };
        updates['/Products/' + newProductKey] = product;
        database.ref().update(updates);
    };

    return(
        <div style={{textAlign: "center"}}>
            <AddCircleOutlineIcon style={{color: "gray", fontSize: 50, marginTop: "100px"}}/>
            <br/>
            <Button size='small' color='primary' onClick={handleClickOpen} variant="contained">
                Add an item
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' >
                <progress value={progress} max="100" className="progress" />
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
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    withPreview={true}
                                />
                        </ListItem>
                        <ListItem>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Price</InputLabel>
                                <OutlinedInput
                                    value={values.price}
                                    onChange={handleChange('price')}
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
