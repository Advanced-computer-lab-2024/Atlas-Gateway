import express from 'express';
const router = express.Router();
import {
	createActivities,
	getActivities,
	updateActivityById,
	deleteActivityById,
} from '../Controllers/activity.controller';

router.post('/create', createActivities);
router.get('/list', getActivities);
router.put('/update/:id', updateActivityById);
router.delete('/delete/:id', deleteActivityById);

export default router;
