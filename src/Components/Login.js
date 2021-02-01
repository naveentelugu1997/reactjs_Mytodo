import React, {useState, useEffect} from 'react';
import StyledfirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Card, makeStyles } from '@material-ui/core';
import Form from './Form';
import Header from './Header';
import './Login.css';
import { db } from './Firebase';
import { CenterFocusStrong, FullscreenExit } from '@material-ui/icons';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 400,
      maxHeight: 1000,
      marginTop: 100,
      marginBottom: 150
    }
  });

function Login() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user)=>{  
            setIsLogedIn(!!user);
            
        })
    }, []) 

    return (
        <div className='login'>
            { isLogedIn ?  (
                <div className="header_form">
                    <Header  /> 
                    <Form  />
                </div>
                ) : 
                (<Card className={classes.root}>
                    <h2 className="signInTitle">Sign In</h2>
                    <div className="signInButton">
                        <StyledfirebaseAuth uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()} />
                    </div>
                </Card>)
        }
        </div>
    )
}

export default Login
