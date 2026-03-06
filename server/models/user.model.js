import mongoose from 'mongoose';
import { workgroups, roles } from '../enum.js';

const userSchema = new mongoose.Schema({
    empid:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'User',
        
    },
    workgroup:{
        type: String,
        required: true,
        enum: workgroups
    },
    links:{
        type: [{
            name: String,
            url: String
        }],
        default: []
    }
},
 { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;