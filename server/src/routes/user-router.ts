import express from 'express';
import * as UserController from '../controllers/user-controller'

const router = express.Router();

// router.get('/users', UserController.getUser);
router.post('/users', UserController.creatUser);

export default router;