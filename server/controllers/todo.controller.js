import Todo from "../models/todo.model.js";

// @desc    Create new todo
export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @desc get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc update todo by id
export const updateTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        todo.set(req.body);
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

