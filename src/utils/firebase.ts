import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
}
// initializeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}
const auth = firebase.auth()
export { auth }