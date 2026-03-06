import express from 'express';
import { 
    createTodo,
    getAllTodos,
    updateTodoById,
    deleteTodoById
    
    
} from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/', createTodo); // POST /api/todos
router.get('/',getAllTodos)// GET /api/todos
router.put('/:id', updateTodoById); // PUT /api/todos/:id
router.delete('/:id', deleteTodoById); // DELETE /api/todos/:id
// router.get('/:id', getTodoById); // GET /api/todos/:id


export default router;