import {  Router } from 'express';
import { taskcontroller } from './task.Controller';
import { CreateValidator } from './task.Validator';
import { UpdateValidator } from './task.Validator';


export const TaskRouter: Router = Router();

//Create Default Route

TaskRouter.get( '/task', taskcontroller.getAll );

TaskRouter.post(
    '/task',CreateValidator,
  taskcontroller.create,
);

TaskRouter.put( '/task', UpdateValidator, taskcontroller.update,);