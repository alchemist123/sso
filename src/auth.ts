import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import * as appleSigninAuth from 'apple-signin-auth';
import { auth } from './firebase';
import dotenv from 'dotenv';

dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) throw new Error('Invalid Google token');

    const firebaseToken = await auth.createCustomToken(payload.sub);
    res.json({ firebaseToken });
  } catch (error) {
    next(error);
  }
};

export const appleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken, code } = req.body;
    const appleToken = await appleSigninAuth.verifyIdToken(idToken, {
      audience: process.env.APPLE_CLIENT_ID,
      nonce: code,
    });

    if (!appleToken.sub) throw new Error('Invalid Apple token');

    const firebaseToken = await auth.createCustomToken(appleToken.sub);
    res.json({ firebaseToken });
  } catch (error) {
    next(error);
  }
};
