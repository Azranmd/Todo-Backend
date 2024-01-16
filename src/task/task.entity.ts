import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status";
import { Priority } from "../enum/priority";



@Entity() export class TaskEntity {
    @PrimaryGeneratedColumn ('uuid') 
    id:string;

    @Column({type:'text'})
        Title:string;
    
    @Column({type:"varchar",length:255})
        Date:string;
    
    @Column({type:"longtext"})
        Description:string;

    @Column({type:"enum",default:Priority.normal,enum:Priority})
        Priority:Priority;
    
    @Column({type:'enum',default:Status.todo,enum:Status})
        Status:Status;

};

