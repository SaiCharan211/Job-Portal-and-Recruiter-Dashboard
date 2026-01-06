import pkg from '@prisma/client';
import { calculateATSScore } from '../utils/atsMatcher.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

//APPLY FOR A JOB WITHOUT ATS
// export const applyToJob= async (req,res)=>{
//     try {
//         const jobId=Number(req.params.jobId)
//         const userId=req.user.id

//         const existing=await prisma.application.findFirst({
//             where:{jobId,userId}
//         })

//         if(existing){
//             return  res.status(400).json({message:"You have already applied to this job"})
//         }else{
//             const application=await prisma.application.create({
//                 data:{
//                     jobId,
//                     userId
//                 }
//             })
//         }
//         res.status(201).json({message:"Applied successfully"})
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }


//APPLY FOR A JOB WITH ATS
export const applyToJob = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId);
        const userId = req.user.id;
        const { resumeText } = req.body;

        const job = await prisma.job.findUnique({
            where: { id: jobId }
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const existing = await prisma.application.findFirst({
            where: { jobId, userId }
        });

        if (existing) {
            return res.status(400).json({ message: "Already applied" });
        }

        const atsResult = calculateATSScore(resumeText, job);

        const application = await prisma.application.create({
            data: {
                jobId,
                userId,
                resumeText,
                atsScore: atsResult.score,
                matchedSkills: atsResult.matchedSkills
            }
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "ATS application failed" });
    }
};

//GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id },
            include: {
                job: true
            }
        })
        res.status(200).json({ applications })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//GET APPICANTS FRO A JOB
export const getApplicantsForJob = async (req, res) => {
    try {
        const jobId = Number(req.params.jobId)

        //Without ATS
        // const applicants = await prisma.application.findMany({
        //     where: { jobId },
        //     include: {
        //         user: {
        //             select: { id: true, name: true, email: true }
        //         }
        //     }
        // })

        //With ATS
        const applicants = await prisma.application.findMany({
            where: { jobId },
            orderBy: {
                atsScore: "desc"
            },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });

        res.status(200).json({ applicants })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//UPDATE APPLICATION STATUS
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = Number(req.params.id)

        const updated = await prisma.application.update({
            where: { id: applicationId },
            data: { status }
        })
        res.json({ updated })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}