import { Router } from 'express';
import * as controller from '../controllers/controller.js'

const router = Router();

router.post('/runner', controller.saveRunner);
router.delete('/runner/:id', controller.delRunner);
router.get('/runner', controller.getRunners);
router.get('/runner/:id', controller.getRunner);
router.post('/leaderBoard', controller.savePosition);
router.get('/leaderBoard', controller.results);
router.delete('/leaderBoard', controller.clearResults)
router.get('/races', controller.getRaces);

export default router;

