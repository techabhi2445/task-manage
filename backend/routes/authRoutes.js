import express from 'express';
import  {allUsers, register,login,logout}  from '../controller/userController.js';

const userRouter = express.Router(); 

userRouter.post('/register', register);
userRouter.post('/all-users', allUsers);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;