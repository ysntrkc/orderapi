import UserController from '../controllers/User';
import express from 'express';

const app = express();

app.get('/all', UserController.getAll);
app.get('/:id', UserController.get);
app.delete('/:id', UserController.delete);
app.put('/:id', UserController.update);
app.post('/assign-role', UserController.assignRole);