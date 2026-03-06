import express from 'express';
import { 
    getUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';
import { loginUser } from '../controllers/auth.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 */
router.post('/login', loginUser);

/**
 * @route   POST /api/users/register
 * @desc    Self-registration (Default role: User)
 */
router.post('/register', createUser);


// --- PROTECTED ROUTES (Requires Login) ---
router.use(protect); // All routes below this line require a valid JWT

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 */
router.get('/', authorize(['Admin']), getUsers);

/**
 * @route   GET /api/users/:empid
 * @desc    Get user by ID (Accessible by Admin or the Manager of that Workgroup)
 */
router.get('/:empid', authorize(['Admin', 'Manager']), getUserById);

/**
 * @route   PUT /api/users/:empid
 * @desc    Update user (Admin only)
 */
router.put('/:empid', authorize(['Admin']), updateUser);

/**
 * @route   DELETE /api/users/:empid
 * @desc    Delete user (Admin only)
 */
router.delete('/:empid', authorize(['Admin']), deleteUser);


// --- WORKGROUP SPECIFIC EXAMPLES ---
/**
 * @route   GET /api/users/it-department
 * @desc    Example: Only Managers within the 'IT' workgroup can access
 */
router.get('/it-department', authorize(['Manager'], ['IT']), getUsers);

export default router;