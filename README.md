<p align="center"><img width="400" height="300" src="https://github.com/cs394-w20/thrift-shift/blob/master/images/logo.png"></p>

# Thrift Shift 
Thrift Shift is an online marketplace for people to sell clothes to a thrift store and for thrift stores to buy clothes. Buyers can make a bid on an item and wait for the selller to accept the bid. 

<p float="left"><img width="260" height="550" src="https://github.com/cs394-w20/thrift-shift/blob/master/images/inventory.png">
<img width="260" height="550" src="https://github.com/cs394-w20/thrift-shift/blob/master/images/page.png">
<img width="260" height="550" src="https://github.com/cs394-w20/thrift-shift/blob/master/images/bid.png">

Link to the app: https://thriftshift-43243.firebaseapp.com/


## Set Up

### System Requirements for Development
* nodejs
* npm
* firebase

### Installation
Clone the repository
```
git clone https://github.com/cs394-w20/thrift-shift.git
```
Inside the thrift-shift folder, run
```
npm install
```

### Firebase
Create a project with Firebase and connect to the app: https://firebase.google.com/docs/web/setup

For React apps, install firebase node module
```
npm install --save firebase
```
Import firebase into the app
```
import firebase from 'firebase/app';
import 'firebase/database';
```
Create a file `src/utils/FirebaseConfig.js` and add the Firebase config object as found in the Firebase console.
```
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
```


Login to your firebase account locally by running
```
firebase login
```

The app uses:
* [Realtime Database](https://firebase.google.com/docs/database)
* [Cloud Storage](https://firebase.google.com/docs/storage)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)

### Running and Deployment
To run app locally
```
npm start
```
To deploy application, first:

In a terminal window on your machine, install the Firebase CLI globally with
```
npm install -g firebase-tools
```
Switch into your local app directory and initialize your app's Firebase configuration:
```
firebase init
```
Choose hosting cloud firestore and the real-time database.
For the following questions, you should do:
1. What Firebase features do you want? Pick Database, and Hosting if you'd like to deploy your web app on Firebase
2. What Firebase project to connect to? Pick the one you created. 
3. What is your public directory? Enter build. Do not accept the default value "public".

After you set up the firebase, run 
```
npm run build
firebase deploy
```

## Built With
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)

## Future Development
* Change database to be relational instead of using Firebase
* Add profile for each buyer with information about the buyer’s thrift store
* Allow users use mobile or email to register
* Add feature that allows users to search or filter products
