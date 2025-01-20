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
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL
};

// Initialize Firebase Admin with credentials
initializeApp({
  credential: cert(serviceAccount)
});

// Initialize and export services
export const db = getFirestore();
export const auth = getAuth();