import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()


//CREATE JOB
export const createJob = async (req,res)=>{
    try {
        const {title,description, location,skills}=req.body 

        const job=await prisma.job.create({
            data:{
                title,
                description,
                location,
                skills,
                recruiterId:req.user.id
            }
        })
        res.status(201).json({message:"Job created successfully", job})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//GET ALL JOBS
export const getAllJobs =async (req,res)=>{
    try {
        const jobs=await prisma.job.findMany({
            include:{
                recruiter:{
                    select:{name:true,email:true}
                }
            }
        })
        res.status(200).json({jobs})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//GET SINGLE JOB
export const getJobById =async (req,res)=>{
    try {
        const job=await prisma.job.findUnique({
            where:{id:Number(req.params.id)}
        })
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }else{
            res.status(200).json({job})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//UPDATE JOB
export const updateJob=async (req,res)=>{
    try{
        const job=await prisma.job.update({
            where:{
                id:Number(req.params.id),
                recruiterId:req.user.id
            },
            data:req.body
        })
        res.json(job)
    }catch(error){  
        res.status(500).json({ message: error.message })
    }
}


//DELETE JOB

export const deleteJob=async (req,res)=>{
    try {
        const job=await prisma.job.delete({
            where:{
                id:Number(req.params.id),
                recruiterId:req.user.id
            }
        });
        res.json({message:"Job deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}