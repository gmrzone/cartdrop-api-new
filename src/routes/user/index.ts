import express from 'express';
import { createUser, getUsers } from '../../controllers/users';

const router = express.Router();

router.post('/create', createUser);

router.get('/', getUsers);

export default router;
