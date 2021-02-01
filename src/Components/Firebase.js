import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDbzJdNUVi7RB0kP9g2Aqtyb_BE5MfcECg",
    authDomain: "mytodosapp-a180b.firebaseapp.com",
    projectId: "mytodosapp-a180b",
    storageBucket: "mytodosapp-a180b.appspot.com",
    messagingSenderId: "315347951592",
    appId: "1:315347951592:web:5ca86198577918248c4e5d"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
  export default fire;
  export {db};