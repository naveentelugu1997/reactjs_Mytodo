import { Button } from '@material-ui/core';
import React from 'react'
import './Header.css';
import firebase from 'firebase';

function header(props) {
    return (
        <div className="header">
            <div className="logoutbutton">
                <button  
                onClick={() => firebase.auth().signOut()}>Logout
                </button>
            </div>
            <h1 className="header_title">My ToDo's</h1>            
        </div>
    )
}

export default header
