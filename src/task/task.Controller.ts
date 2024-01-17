import { Request,Response } from 'express';
import { TaskEntity } from './task.entity';
import { AppDataSource } from '../..';
import { instanceToPlain } from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

 class TaskController { 
  // GET Method
  public async getAll(req:Request,res:Response): Promise<Response> {
    //Declare a Variable to Hold all Tasks
    let AllTasksEntity: TaskEntity[];
    
    //Fetch all Tasks Using the Repository
    try {
      AllTasksEntity = await AppDataSource.getRepository(TaskEntity,).find({
        order: {
          Date: 'ASC',
        },
      });
      
      // Convert the tasks instance to an array of Objects
      AllTasksEntity = instanceToPlain( AllTasksEntity,) as TaskEntity[];
      return res.json(AllTasksEntity).status(200);

    } catch (_errors) {
        return res.json({error:'Internal Server Error'}).status(500);
      
    }
  }

  // POST Method
  public async create (req:Request,res:Response) : Promise<Response> 
  {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    // Create New Instance of Class
    const newTaskEntity = new TaskEntity();

    //Add Required Properties to the Task Object
    newTaskEntity.Title = req.body.Title;
    newTaskEntity.Date = req.body.Date;
    newTaskEntity.Description = req.body.Description;
    newTaskEntity.Priority = req.body.Priority;
    newTaskEntity.Status = req.body.Status;

    //Add the new Task to the Database
    let createdTaskEntity : TaskEntity;
    try{
        createdTaskEntity = await AppDataSource.getRepository(TaskEntity,).save(newTaskEntity);
    
    //convert task instance to an object
    createdTaskEntity = instanceToPlain(createdTaskEntity) as TaskEntity;
    return res.json(createdTaskEntity).status(201);

    } catch (errors) {
        return res.json({ error : 'Internal Server Error '}).status(500);
    }
  }

  //Update Method/ PUT MEthod
  public async update(req:Request,res:Response): Promise<Response>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    //Try to Find If the Task Exist
    let ExistTask : TaskEntity | null;
    try{
      ExistTask = await AppDataSource.getRepository(TaskEntity,).findOne({where : {id : req.body.id} });
      if(!ExistTask){
        return res.status(404).json({error:'The Given Task with Id Does not Exist'});
      }
    
    // Declare the Variable for Update Task
    let UpdatedExistTask : UpdateResult;
    
    // Update The ExistTask
    UpdatedExistTask = await AppDataSource.getRepository(TaskEntity,).update(req.body.id,plainToInstance(TaskEntity,{Status : req.body.Status, }),);
    
    // Convert the Updated Task instance to an Object
    UpdatedExistTask = instanceToPlain(UpdatedExistTask) as UpdateResult;
    return res.json(UpdatedExistTask).status(200); 

    } catch(errors) {
      return res.json({ error : 'Internal Server Error '}).status(500);
    }
  };

  // Delete Tasks
  public async delete(req:Request,res:Response):Promise<Response>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    
    //Try to Find If the Task Exist
    let ExistTask : TaskEntity | null;
    try{
      ExistTask = await AppDataSource.getRepository(TaskEntity,).findOne({where : {id : req.body.id} });
      if(!ExistTask){
        return res.status(404).json({error:'The Given Task with Id Does not Exist'});
      }

    // Declare the Variable for Update Task
    const DeleteExistTask : DeleteResult = await AppDataSource.getRepository(TaskEntity,).delete(req.body.id);

    // Delete The ExistTask
    //DeleteExistTask = await AppDataSource.getRepository(TaskEntity,).delete(req.body.id);

    return res.json(DeleteExistTask).status(200); 

    } catch(errors) {
      return res.json({ error : 'Internal Server Error '}).status(500);
    }
  };

}

export const taskcontroller = new  TaskController();
