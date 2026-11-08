import express from 'express';
import { logout, getSessionUser } from '../controllers/sessionController.js';
import { verifySession } from '../middleware/sessionMiddleware.js';

const router = express.Router();


router.post('/logout', verifySession, logout);
router.get('/session', verifySession, getSessionUser);


export default router;