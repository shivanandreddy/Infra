import express from 'express';
import { 
    getUsers, 
    getUserById, 
    createUser, 
    login,
    updateUser, 
    deleteUser, 
    addLink,
    getLinks,
    getLinkById,
    updateLinkById,
    deleteLinkById
    
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);            // GET /api/users
router.post('/', createUser); 
router.post('/login',login)         // POST /api/users
router.get('/:empid', getUserById);    // GET /api/users/E123
router.put('/:empid', updateUser);    // PUT /api/users/E123
router.delete('/:empid', deleteUser); // DELETE /api/users/E123

router.post('/:empid/links', addLink); // POST /api/users/E123/links
router.get('/:empid/links', getLinks); // GET /api/users/E123/links
router.get('/:empid/links/:linkid', getLinkById); // GET /api/users/E123/links/L123
router.put('/:empid/links/:linkid', updateLinkById); // PUT /api/users/E123/links/L123
router.delete('/:empid/links/:linkid', deleteLinkById); // DELETE /api/users/E123/links/L123


export default router;