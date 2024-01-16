import { body } from "express-validator";
import { Priority } from "../enum/priority";
import { Status } from "../enum/status";
import { ValidationChain } from "express-validator";

// Initial Validator
export const CreateValidator : ValidationChain[] = [
    body('Title')
    .not()
    .isEmpty()
    .withMessage('The Task Title is Mandatory Field')
    .trim()
    .isString()
    .withMessage('The Title needs to be in Text format'),

    body('Date')
    .not()
    .isEmpty()
    .withMessage('The Task Due Date is Mandatory Field')
    .isString()
    .withMessage('The Date needs to be in Text format'),

    body('Description')
    .not()
    .isEmpty()
    .withMessage('The Task DEscription is Mandatory Field')
    .isString()
    .withMessage('The Description needs to be in Text format'),

    body('Priority')
    .trim()
    .isIn([Priority.normal,Priority.low,Priority.high])
    .withMessage('Priority can only be one of Low, Normal or High'),

    body('Status')
    .trim()
    .isIn([Status.todo,Status.inprogress,Status.completed])
    .withMessage('Status can only be one of Todo, InProgress or Completed'),

];

// Update Validator 
export const UpdateValidator = [
    
    body('id')
    .not()
    .isEmpty()
    .withMessage('The Task Id is Mandatory')
    .trim()
    .isString()
    .withMessage('Id needs to be a Valid UUID Format'),

    body('Status')
    .trim()
    .isIn([
        Status.todo,
        Status.inprogress,
        Status.completed,
    ])
    .withMessage('Status Can Only be Todo, InProgress or Completed'),
];