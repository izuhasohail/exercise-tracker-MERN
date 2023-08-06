import express from 'express'
import cors from 'cors'
import { config } from 'dotenv';
import mongoose from 'mongoose';
import exercisesRouter from './routes/exercises.js'; // Add .js extension
import usersRouter from './routes/users.js';
config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection=mongoose.connection;
connection.once(
    'open',
    ()=>{
        console.log('MongoDB database connection established succesfully')
    }
);

/*Routes for handling the http requests
e.g
http://localhost:500/exercises */

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter)




app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
});