import express from 'express';
import { 
    createHandover,
    getAllHandovers,
    updateHandoverById,
    deleteHandoverById,
    duplicateHandoverById

} from '../controllers/handover.controller.js';

const router = express.Router();

router.post('/', createHandover); // POST /api/handovers
router.get('/',getAllHandovers)// GET /api/handovers
router.put('/:id', updateHandoverById); // PUT /api/handovers/:id
router.delete('/:id', deleteHandoverById); // DELETE /api/handovers/:id
router.post('/dup/:id',duplicateHandoverById) // POST /api/handovers/dup/:id

export default router;