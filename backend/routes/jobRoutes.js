import express from 'express'
import { createJob, updateJob, deleteJob, getAllJobs, getJobById } from '../controllers/jobController.js'
import { protect } from '../middleware/authMiddleware.js'
import { recruiterOnly } from '../middleware/roleMiddleware.js'


const router = express.Router()

router.get('/', getAllJobs)
router.get('/:id', getJobById)

router.post('/', protect, recruiterOnly, createJob)
router.put('/:id', protect, recruiterOnly, updateJob)
router.delete('/:id', protect, recruiterOnly, deleteJob)

export default router