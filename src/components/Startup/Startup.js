import React from "react";
import { Button } from '@material-ui/core';
import { signInWithGoogle } from '../../utils/FirebaseAuthUtils';
import './Startup.css'
import '../../App.css'

const Startup = () => {
	return (
		<div className="startup-background">
			<div className="content">
				<div style={{ textAlign: 'center' }}>
					<span className='thrift' style={{ fontSize: '40px'}}>
						THRIFT
        	</span>
					<span className='shift' style={{ fontSize: '40px'}}>
						SHIFT
        	</span>
				</div>
				<div>
					<img src='logo.png' style={{ mixBlendMode: 'multiply' }}></img>
				</div>

				<Button
					variant="contained"
					type="submit"
					style={{ background: '#67A6FC', marginTop: '100px', color: 'white', width: '30%', marginLeft: '35%' }}
					onClick={signInWithGoogle}
				>
					Sign In
      	</Button>
			</div>
		</div>
	);
}

export { Startup }