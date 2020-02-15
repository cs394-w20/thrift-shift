import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover, Typography, Button } from '@material-ui/core';
import { signOut } from '../utils/FirebaseAuthUtils';

const LogoutPopover = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button size="small" aria-describedby={id} variant="contained" color="primary" onClick={handleClick} disableElevation>
                {props.children}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Button size="large" onClick={signOut}>Sign out</Button>
            </Popover>
        </div>
    );
}

export default LogoutPopover
