
import express from 'express'
import { createUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from '../controllers/userControllers.js';


const router = express.Router();


router.post('/signup',createUser)
router.get('/allusers',getUsers)
router.post('/login',loginUser)
router.get('/:id',getUserById)
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router
