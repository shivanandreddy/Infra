import express from 'express';
import { 
    createTicket,
    getAllTickets,
    // getTicketById,
    updateTicketById,
    deleteTicketById
} from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', createTicket); // POST /api/tickets
router.get('/',getAllTickets)// GET /api/tickets
// router.get('/:id', getTicketById); // GET /api/tickets/:id
router.put('/:id', updateTicketById); // PUT /api/tickets/:id
router.delete('/:id', deleteTicketById); // DELETE /api/tickets/:id

export default router;