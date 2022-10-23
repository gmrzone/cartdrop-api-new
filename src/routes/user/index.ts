import express from 'express';
import { createUser, getUsers, signUp } from '../../controllers/users';

const router = express.Router();

router.post('/create', createUser);
router.post('/signup', signUp);
router.get('/', getUsers);

export default router;
