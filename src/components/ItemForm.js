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
	Fab,
	Slide,
	Fade
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import AddIcon from '@material-ui/icons/Add'
import { addProduct } from '../utils/FirebaseDbUtils'
import { uploadLQImage } from '../utils/FirebaseStorageUtils';
import { getUser } from '../utils/FirebaseAuthUtils'
import useMediaQuery from '@material-ui/core/useMediaQuery';
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

const SlideTransition = React.forwardRef((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef((props, ref) => {
	return <Fade ref={ref} {...props} />
})

const ItemForm = () => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);
	const [product, setProduct] = useState({
		name: '',
		price: '',
		imageId: '',
		description: ''
	});
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		initialState();
		setOpen(false);
	};

	const initialState = () => {
		setProgress(0);
		setProduct({
			name: '',
			price: '',
			imageId: '',
			description: ''
		})
	}

	const handleChange = prop => event => {
		setProduct({ ...product, [prop]: event.target.value });
	};

	const handleImageUpload = (pictureFiles, pictureDataURLs) => {
		console.log(pictureFiles)
		const uuidv4 = require('uuid/v4');
		const imageId = uuidv4();
		setProduct({ ...product, imageId: imageId });
		setImage(pictureFiles[0]);
	};

	const addItem = () => {
		uploadLQImage(image, product.imageId, setProgress, setOpen, () => { addProduct(getUser().uid, product) })
	};

	return (
		<div>
			<div className={classes.root}>
				<Fab variant="extended" onClick={handleClickOpen} className={classes.fab} color="secondary" aria-label="edit">
					<AddIcon />
					Add Item
				</Fab>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' fullScreen={fullScreen} TransitionComponent={fullScreen ? SlideTransition : FadeTransition}>
				<DialogTitle id='alert-dialog-title'>Add an Item to Sell</DialogTitle>
				<DialogContent>
					<List>
						<ListItem>
							<TextField label="Item Name" value={product.name} variant="outlined" onChange={handleChange('name')} />
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
						<ListItem>
							<TextField multiline label="Description" value={product.description} variant="outlined" onChange={handleChange('description')} />
						</ListItem>
						<ListItem>
							<ImageUploader
								withIcon={true}
								buttonText='Choose image'
								onChange={handleImageUpload}
								accept="image/*"
								maxFileSize={20971520}
								label="Upload image to show your item"
								withPreview={true}
							/>
						</ListItem>
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { handleClose() }}>Cancel</Button>
					<Button variant="contained" color="secondary" onClick={() => { addItem() }}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default ItemForm
