import React from 'react';
import { Popover, Button } from '@material-ui/core';
import { signOut } from '../utils/FirebaseAuthUtils';

const LogoutPopover = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        signOut()
        props.setUser(null)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button size="small" aria-describedby={id} onClick={handleClick} disableElevation>
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
                <Button size="large" onClick={handleSignOut}>Sign out</Button>
            </Popover>
        </div>
    );
}

export default LogoutPopover
