import express from 'express';
import { addtask,updateTask,deleteTask,getAllTasks } from '../controller/taskController.js';

const taskRouter = express.Router(); 

taskRouter.post('/addtask', addtask);
taskRouter.get('/alltasks', getAllTasks);
taskRouter.delete('/deletetask/:id', deleteTask);
taskRouter.put('/updatetask/:id', updateTask);



export default taskRouter;