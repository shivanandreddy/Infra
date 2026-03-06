import mongoose from "mongoose";
import { workgroups,todo_status } from "../enum.js";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: todo_status,
        default: "Open"
    },
    workgroup: {
        type: String,
        enum: workgroups
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});


const Todo = mongoose.model('Todo', todoSchema);
export default Todo