import React from "react";
import "rbx/index.css";
import { makeStyles } from "@material-ui/core/styles";
import MakeBidDialog from "./MakeBidDialog";
import "firebase/storage";
import {
  Grid,
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ProductDescriptionCard = props => {
  const classes = useStyles();

  if (props.product) {
    return (
      <Dialog
        fullScreen
        open={props.open}
        onClose={() => {
          props.setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <AppBar style = {{background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                props.setOpen(false);
              }}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography >
            <h1 style = {{textAlign: 'center'}}> <div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontWeight: 'bolder', color:'white', letterSpacing:'4px'}}> 
          				THRIFT
          				</div>
          				<div style={{display: 'inline-block', fontFamily:'Gill Sans Nova', fontStyle: 'italic', color:'white', letterSpacing:'4px', fontWeight: "100"}}> SHIFT</div>
          				</h1>
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <DialogContent>
          <Grid
            justify="center"
            direction="column"
            alignItems="center"
            container
            style={{ padding: "15px 10px 15px 10px" }}
            spacing={2}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} container>
                <Grid xs item>
                  <Typography style = {{fontFamily: 'Proxima Nova', color: '#707070', fontSize: '30px', fontWeight:'900'}} variant="h5">{props.product.name}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} container>
                <img
                  className={classes.img}
                  alt={props.product.name}
                  src={props.imageURL}
                />
              </Grid>
              <Grid item xs={12} sm={12} container>
                <Grid item xs container>
                  <Typography style = {{fontFamily: 'Proxima Nova', color: '#707070', fontSize: '28px', fontWeight:'600', opacity :'100%'}} gutterBottom variant="h5">
                    LIST PRICE
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" style = {{fontFamily: 'Proxima Nova', color: '#707070', fontSize: '36px', fontWeight:'900'}}>$ {props.product.price} </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} container>
                <Typography gutterBottom variant="body1" style = {{fontFamily: 'Proxima Nova', color: '#707070', fontSize: '24px'}}>
                  {props.product.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MakeBidDialog
            user={props.user}
            userRole={props.userRole}
            productId={props.productId}
            setProductDescriptonCardOpen={props.setOpen}
            setPage={props.setPage}
          />
        </DialogActions>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default ProductDescriptionCard;
