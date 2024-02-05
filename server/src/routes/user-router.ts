import express from 'express';
import * as UserController from '../controllers/user-controller'

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/wins', UserController.getUsersByWins);
router.get('/gamesPlayed', UserController.getUsersByGamesPlayed);
router.get('/turns', UserController.getUsersByTurns);

router.get('/lasthour', UserController.getLastHour);
router.get('/lasthour/wins', UserController.getLastHourByWins);
router.get('/lasthour/turns', UserController.getLastHourByTurns);
router.get('/lasthour/gamesPlayed', UserController.getLastHourByGamesPlayed);

router.post('/', UserController.creatUser);
router.patch('/:userId', UserController.updateUser);
router.get('/:userId', UserController.getUser);

export default router;