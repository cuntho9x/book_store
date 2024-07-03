import express from 'express';
import{Book} from '../models/bookmodel.js';

const router= express.Router();

// route for save a new book
router.app.post('/', async (request, reponse) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields:title, author,publishYear',
            });
        }
        const newbook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newbook);
        return reponse.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        reponse.status(500).send({ message: error.message });
    }
});

// route for get all book from DB
router.app.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for get all book from DB by id
router.app.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// route for update book 
router.app.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields:title, author,publishYear',
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).json({ message: 'Book updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for delete book
router.app.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return reponse.status(404).json({ message: 'book not found' });
        }
        return response.status(200).json({ message: 'book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;