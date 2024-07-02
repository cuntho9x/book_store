import express, { request, response } from "express"
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
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields:title, author,publishYear',
            });
        }
        const newbook = {
            title: request.body.title,
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

// route for get all book from DB
app.get('/books', async(request,response)=>{
    try{
        const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data: books
        });
    }   catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for get all book from DB by id
app.get('/books/:id', async(request,response)=>{
    try{
        const {id} =request.params;
        const books=await Book.findById(id);
        return response.status(200).json({
            count:books.length,
            data: books
        });
    }   catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route for update book 
app.put('/books/:id', async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear 
        ){
            return response.status(400).send({
                message:'Send all required fields:title, author,publishYear',
            });
        }  
        const {id} = request.params;
        const result=await Book.findByIdAndUpdate(id,request.body)

        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).json({message:'Book updated successfully'});

    }   catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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