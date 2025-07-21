import express from 'express';
import { createJob,getAllJobs, getJobById, updateJobById, deleteJobById} from '../controller/jobController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();


router.post('/create', authenticateUser, createJob);
router.get('/', getAllJobs); 
router.get('/:id', getJobById); 
router.put('/:id', authenticateUser, updateJobById);
router.delete('/:id', authenticateUser, deleteJobById);

export default router;
