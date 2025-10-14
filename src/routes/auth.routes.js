import { signOut, signUp } from '#controllers/auth.controller.js';
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUp);

authRoutes.post('/sign-in', (req, res) => {
  res.status(200).json({ message: 'POST /api/auth/sign-in response' });
});

authRoutes.post('/sign-out', signOut);

export default authRoutes;
