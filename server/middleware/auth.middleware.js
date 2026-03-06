import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// 1. Verify Token (Authentication)
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token, exclude password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// 2. Authorize Roles & Workgroups (Authorization)
// This is a "factory" function that lets you pass allowed roles/workgroups
export const authorize = (allowedRoles = [], allowedWorkgroups = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const hasRole = allowedRoles.length === 0 || allowedRoles.includes(req.user.role);
        const hasWorkgroup = allowedWorkgroups.length === 0 || allowedWorkgroups.includes(req.user.workgroup);

        if (!hasRole || !hasWorkgroup) {
            return res.status(403).json({ 
                message: `Access denied for Role: ${req.user.role} in Workgroup: ${req.user.workgroup}` 
            });
        }

        next();
    };
};