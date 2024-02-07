import express from 'express';
import * as UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/users', UserController.getUsers);
// router.get('/currentUser', UserController.getCurrentUser);

router.get('/lasthour', UserController.getLastHour);
router.get('/name', UserController.getUserByName);

router.post('/', UserController.creatUser);
router.patch('/:userId', UserController.updateUser);
router.get('/:userId', UserController.getUser);

export default router;