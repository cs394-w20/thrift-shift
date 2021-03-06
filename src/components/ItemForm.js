import React, { useState } from 'react';
import {
	Button,
	ListItem,
	List,
	FormControl,
	DialogActions,
	InputAdornment,
	Dialog,
	DialogContent,
	DialogTitle,
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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
        position: 'fixed',
        zIndex: 1,
	}
}));

const SlideTransition = React.forwardRef((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef((props, ref) => {
	return <Fade ref={ref} {...props} />
})

const ItemForm = ({userRole}) => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);
	const [product, setProduct] = useState({
		name: '',
		imageId: '',
		description: ''
	});
  const [price, setPrice] = useState(null);
	const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(null);
  const [disabled, setDisabled] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		initialState();
		setOpen(false);
	};

	const initialState = () => {
    setProgress(null);
    setDisabled(false);
    setPrice(null);
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

  const handleChangePrice = event => {
    setPrice(event.target.value);
  }

	const handleImageUpload = (pictureFiles, pictureDataURLs) => {
		const uuidv4 = require('uuid/v4');
		const imageId = uuidv4();
		setProduct({ ...product, imageId: imageId });
    setImage(pictureFiles[0]);
    console.log(pictureFiles[0])
	};

	const addItem = () => {
		uploadLQImage(image, product.imageId, setProgress, () => { handleClose() }, () => { addProduct(getUser().uid, product, price) });
	};

	return (
    <div>
      {userRole === "seller" ? (
        <div className={classes.root}>
          <Fab
            variant="extended"
            onClick={handleClickOpen}
            className={classes.fab}
            style = {{backgroundColor:'#67A6FC', color: "white"}}
            aria-label="edit"
          >
            <AddIcon className={classes.extendedIcon} />
            Add item
          </Fab>
        </div>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        fullScreen={fullScreen}
        TransitionComponent={fullScreen ? SlideTransition : FadeTransition}
      >
        <DialogTitle id="alert-dialog-title">Add an Item to Sell</DialogTitle>
        <ValidatorForm
          onSubmit={() => {
            addItem();
            setDisabled(true);
          }}
        >
          <DialogContent>
            <List>
              <ListItem>
                <TextValidator
                  label="Item Name"
                  value={product.name}
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  onChange={handleChange("name")}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth variant="outlined">
                  <TextValidator
                    label="Price"
                    variant="outlined"
                    id="standard-number"
                    min={0}
                    value={price}
                    onChange={handleChangePrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
					            ),
					            labelWidth: 60
                    }}
                    validators={[
                      "required",
                      "matchRegexp:^[0-9]*$"
                    ]}
                    errorMessages={[
                      "This field is required",
                      "Price must be a positive number"
                    ]}
                  />
                </FormControl>
              </ListItem>
              <ListItem>
                <TextValidator
                  multiline
                  label="Description"
                  value={product.description}
                  variant="outlined"
                  onChange={handleChange("description")}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                />
              </ListItem>
              <ListItem>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose image"
                  onChange={handleImageUpload}
                  accept="image/*"
                  maxFileSize={20971520}
                  label="Upload image to show your item"
                  withPreview={true}
                  singleImage={true}
                  required
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style = {{backgroundColor:'#67A6FC'}}
              type="submit"
              disabled={!image || disabled}
            >
              Submit
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default ItemForm
