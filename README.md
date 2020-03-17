# Thrift Shift 
Thrift Shift is an online marketplace for people to sell clothes to a thrift store and for thrift stores to buy clothes.

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
To deploy application, run
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
