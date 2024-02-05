import express from 'express';
import * as UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/wins', UserController.getUsersByWins);
router.get('/gamesPlayed', UserController.getUsersByGamesPlayed);
router.get('/lasthour', UserController.getLastHour);
router.get('/:userId', UserController.getUser);
router.post('/', UserController.creatUser);
router.patch('/:userId', UserController.updateUser);

export default router;