import express from 'express'
import { applyToJob,getApplicantsForJob,getMyApplications,updateApplicationStatus } from '../controllers/applicationController.js'
import { protect } from '../middleware/authMiddleware.js'
import { recruiterOnly } from '../middleware/roleMiddleware.js'

const router=express.Router()

//JOB SEEKER
router.post('/apply/:jobId',protect,applyToJob)
router.get('/my',protect,getMyApplications)

//RECRUITER
router.get('/job/:jobId',protect,recruiterOnly,getApplicantsForJob)
router.put('/:id',protect,recruiterOnly,updateApplicationStatus)

export default router