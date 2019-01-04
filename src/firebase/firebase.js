import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

const admin = require("firebase-admin");
//const serviceAccount = require("./serviceAccountKey.json");

const refreshToken = require("./token.json"); // Get refresh token from OAuth2 flow

const adminApp = admin.initializeApp(
  {
    credential: admin.credential.refreshToken(refreshToken),
    databaseURL: process.env.REACT_APP_DATABASE_URL
  },
  "other"
);
/* const adminApp = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flad-mentorship.firebaseio.com"
  },
  "other"
);
 */
/* const adminApp = admin.initializeApp(
  {
    credential: admin.credential.cert({
      project_id: process.env.REACT_APP_PROJECT_ID,
      client_email: process.env.REACT_APP_CLIENT_EMAIL,
      private_key: process.env.REACT_APP_PRIVATE_KEY
    }),
    databaseURL: process.env.REACT_APP_DATABASE_URL
  },
  "other"
);
 */
export { auth, db, storage, adminApp };
