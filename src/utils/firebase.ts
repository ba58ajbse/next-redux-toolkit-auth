import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}
console.log(process.env.FB_APP_ID)
// initializeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}
const auth = firebase.auth()
export { auth }