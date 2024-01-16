import express,{Express,} from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import { TaskEntity } from "./src/task/task.entity";
import { TaskRouter } from "./src/task/task.route";


// Instantiate epress app
const app:Express = express();
dotenv.config();

//Parse Request Body
app.use(bodyParser.json());

//USe CORS install types As well
app.use(cors());

//Create Database Connection
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [TaskEntity],
    synchronize: true,
  });

//Define Server Port
const port=process.env.PORT;

//Listening Port
AppDataSource.initialize().then(() => {
  app.listen(port);
  console.log("DataSource has been Initialized");
}).catch((err) => {
  console.error("Error during Data Source Initialization", err);
});

//Create Default Route
//app.get('/',(req:Request,res:Response)=>{
//res.send('Express + TypeScript 02061998');
//});
app.use('/',TaskRouter);


