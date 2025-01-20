import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as dotenv from 'dotenv';

// Must be before any process.env usage
dotenv.config();

// Check if environment variables are loaded
console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);

const serviceAccount = {
  type: "service_account",
  project_id: "four-sigma2", // Hardcode this value for now
  private_key_id: "38eee865ab69a0318879458a2380ab609ff9dbf6",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: "104922965315273490008",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40four-sigma2.iam.gserviceaccount.com"
};

// Initialize Firebase Admin with credentials
initializeApp({
  credential: cert(serviceAccount)
});

// Initialize and export services
export const db = getFirestore();
export const auth = getAuth();