import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Grid,
    Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAlert } from "../context/AlertContext";

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [applicantCounts, setApplicantCounts] = useState({});
    const { showAlert } = useAlert();

    /* ---------------- FETCH JOBS ---------------- */
    const fetchJobs = async () => {
        try {
            const res = await api.get("/jobs");

            const myJobs = res.data.jobs.filter(
                job => job.recruiter?.email === localStorage.getItem("email")
            );

            setJobs(myJobs);
            fetchApplicantCounts(myJobs);
        } catch (error) {
            showAlert("Failed to load jobs", error);
        }
    };

    /* ------------ FETCH APPLICANT COUNTS ----------- */
    const fetchApplicantCounts = async (jobsList) => {
        try {
            const counts = {};

            await Promise.all(
                jobsList.map(async (job) => {
                    const jobId = job._id || job.id;
                    const res = await api.get(`/applications/job/${jobId}`);
                    counts[jobId] = res.data.applicants?.length || 0;
                })
            );

            setApplicantCounts(counts);
        } catch (error) {
            console.error("Failed to load applicant counts", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    /* ---------------- DELETE JOB ---------------- */
    const deleteJob = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs(jobs.filter(job => (job._id || job.id) !== jobId));
            showAlert("Job deleted successfully", "success");
        } catch (error) {
            showAlert("Failed to delete job", error);
        }
    };

    return (
        <Box>
            {/* ---------- HEADER ---------- */}
            <Box sx={{ mb: 6 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography variant="h3" fontWeight="bold">
                            Recruiter Dashboard
                        </Typography>
                        <Typography color="text.secondary">
                            Manage your job postings
                        </Typography>
                    </Box>

                    <Button
                        component={Link}
                        to="/post-job"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            fontWeight: "bold"
                        }}
                    >
                        Post New Job
                    </Button>
                </Box>

                <Box sx={{
                    width: 80,
                    height: 4,
                    mt: 1,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 2
                }} />
            </Box>

            {/* ---------- EMPTY STATE ---------- */}
            {jobs.length === 0 ? (
                <Box sx={{
                    textAlign: "center",
                    py: 10,
                    bgcolor: "white",
                    borderRadius: 3,
                    boxShadow: 1
                }}>
                    <WorkIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold">
                        No jobs posted yet
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Start by posting your first job
                    </Typography>
                    <Button
                        component={Link}
                        to="/post-job"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            fontWeight: "bold"
                        }}
                    >
                        Post a Job
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {jobs.map(job => {
                        const jobId = job._id || job.id;

                        return (
                            <Grid item xs={12} key={jobId} sx={{ display: "flex" }}>
                                <Card
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        border: "1px solid #e0e0e0",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow: 6,
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    {/* TOP BAR */}
                                    <Box sx={{
                                        height: 6,
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                    }} />

                                    <CardContent
                                        sx={{
                                            p: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            flexGrow: 1
                                        }}
                                    >
                                        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                                            {/* JOB INFO */}
                                            <Grid item xs={12} md={8}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                    <Typography variant="h5" fontWeight="bold">
                                                        {job.title}
                                                    </Typography>

                                                    <Chip
                                                        label={`Applicants: ${applicantCounts[jobId] || 0}`}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "#eeedeaff",
                                                            color: "#ff0000ff",
                                                            fontWeight: "bold"
                                                        }}
                                                    />
                                                </Box>

                                                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                                    <LocationOnIcon sx={{ color: "#667eea", mr: 1 }} />
                                                    <Typography color="text.secondary">
                                                        {job.location}
                                                    </Typography>
                                                </Box>

                                                {job.description && (
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            mt: 2,
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            minHeight: 42
                                                        }}
                                                    >
                                                        {job.description}
                                                    </Typography>
                                                )}

                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, minHeight: 32 }}>
                                                    {job.skills?.map((skill, i) => (
                                                        <Chip
                                                            key={i}
                                                            label={skill}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: "#f0f0ff",
                                                                color: "#667eea",
                                                                fontWeight: "bold"
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Grid>

                                            {/* ACTIONS */}
                                            <Grid item xs={12} md={4}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 2,
                                                        mt: "auto",
                                                        alignItems: { xs: "flex-start", md: "flex-end" }
                                                    }}
                                                >
                                                    <Button
                                                        component={Link}
                                                        to={`/applicants/${jobId}`}
                                                        variant="contained"
                                                        startIcon={<VisibilityIcon />}
                                                        fullWidth
                                                        sx={{
                                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        Manage Applications
                                                    </Button>

                                                    <Button
                                                        onClick={() => deleteJob(jobId)}
                                                        variant="outlined"
                                                        color="error"
                                                        startIcon={<DeleteIcon />}
                                                        fullWidth
                                                        sx={{ fontWeight: "bold", borderWidth: 2 }}
                                                    >
                                                        Delete Job
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
}
