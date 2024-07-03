import express, { request, response } from "express"
import {PORT,mongoDBULR} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookmodel.js';
import bookRoute from './routes/bookRoute.js';

const app= express();

//middleware for parsing request body
app.use(express.json());

app.get('/',(request,reponse)=>{
    console.log(request)
    return reponse.status(234).send('Welcome to mern stack tutorial');
});

app.use('/books',bookRoute);

mongoose
    .connect(mongoDBULR)
    .then(() =>{
        console.log('App connected to database');
        app.listen(PORT,() =>{
            console.log(`App is listenning to port: ${PORT}`);
        }); 
    })
    .catch((error)=>{
        console.log(error);
    });