import express from 'express'

import {createAdmin,getAdmins} from '../../Controllers/Users/admin.controller';

const router = express.Router();

router.post('/create',createAdmin);
router.get('/list',getAdmins);

export default router;