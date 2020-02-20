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
    TextField,
    Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import AddIcon from '@material-ui/icons/Add'
import { addProduct } from '../utils/FirebaseDbUtils'
import { uploadProductImage } from '../utils/FirebaseStorageUtils';
import { getUser } from '../utils/FirebaseAuthUtils'
import '../App.css';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		margin: 0,
		top: 'auto',
		right: 20,
		bottom: 20,
		left: 'auto',
		position: 'fixed'
	}
}));

const ItemForm = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({
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
        setProduct({ ...product, [prop]: event.target.value });
    };

    const handleImageUpload = (pictureFiles, pictureDataURLs) => {
        const uuidv4 = require('uuid/v4');
        const imageId = uuidv4();
        setProduct({ ...product, imageId: imageId });
        setImage(pictureFiles[0]);
    };

    const addItem = () => {
        addProduct(getUser().uid, product)
        uploadProductImage(image, product.imageId, setProgress)
    };

    return(
        <div>
            <div className={classes.root}>
			<Fab onClick={handleClickOpen} className={classes.fab} color="secondary" aria-label="edit">
				<AddIcon />
			</Fab>
		    </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' >
                <progress value={progress} max="100" className="progress" />
                <DialogTitle id='alert-dialog-title'>Add an Item to Sell</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <TextField label="Item Name" value={product.name} variant="outlined" onChange={handleChange('name')} />
                        </ListItem>
                        <ListItem>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    maxFileSize={5242880}
                                    withPreview={true}
                                />
                        </ListItem>
                        <ListItem>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Price</InputLabel>
                                <OutlinedInput
                                    value={product.price}
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
                    <Button variant="contained" color="secondary" onClick={() => {addItem()}}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ItemForm
