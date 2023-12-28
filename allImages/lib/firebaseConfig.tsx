const firebaseConfig = {
  apiKey: process.env.NEXT_APP_APIKEY,
  authDomain: process.env.NEXT_APP_AUTHDOMAIN,
  projectId: process.env.NEXT_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_APP_MESSAGINGSENDERID,
  appId: process.env.NEXT_APP_APPID,
  measurementId: process.env.NEXT_APP_MEASUREMENTID,
};

export default firebaseConfig;