import express from 'express';
import * as UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUser);
router.post('/', UserController.creatUser);

export default router;