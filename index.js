import express, { response } from "express"
import {PORT,mongoDBULR} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookmodel.js';


const app= express();

//middleware for parsing request body
app.use(express.json());

app.get('/',(request,reponse)=>{
    console.log(request)
    return reponse.status(234).send('Welcome to mern stack tutorial');
});

// route for save a new book
app.post('/books',async (request,reponse)=>{
    try{
        if(
            !request.body.tilte||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields:title, author,publishYear',
            });
        }
        const newbook = {
            title: request.body.tilte,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }; 
        const book = await Book.create(newbook);
        return reponse.status(201).send(book);

    }catch (error){
        console.log(error.message);
        reponse.status(500).send({message:error.message});
    }
})

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