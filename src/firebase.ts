import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { ServiceAccount } from 'firebase-admin';

dotenv.config();

const serviceAccount: ServiceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
