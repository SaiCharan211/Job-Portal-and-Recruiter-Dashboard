import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const role = localStorage.getItem("role");

    useEffect(() => {
        api.get("/jobs").then(res => {
            setJobs(res.data.jobs);
        });
    }, []);

    const handleOpen = (job) => {
        setSelectedJob(job);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedJob(null);
    };

    return (
        <>
            <Grid container spacing={3}>
                {jobs.map(job => {
                    const jobId = job._id || job.id;
                    return (
                        <Grid item xs={12} md={6} lg={4} key={jobId}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="div" fontWeight="bold" gutterBottom sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {job.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                                        <Typography variant="body2">{job.location}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '4.5em' }}>
                                        {job.description}
                                    </Typography>
                                    {job.skills && job.skills.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                            {job.skills.slice(0, 3).map((skill, idx) => (
                                                <Chip key={idx} label={skill} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} />
                                            ))}
                                        </Box>
                                    )}
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                                    <Button onClick={() => handleOpen(job)} variant="outlined" fullWidth>
                                        View Details
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/apply/${jobId}`}
                                        variant="contained"
                                        fullWidth
                                        disabled={!role || role.toUpperCase() !== 'JOBSEEKER'}
                                    >
                                        Apply Now
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                {selectedJob && (
                    <>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" fontWeight="bold">{selectedJob.title}</Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                                <LocationOnIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle1">{selectedJob.location}</Typography>
                            </Box>

                            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Description</Typography>
                            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                                {selectedJob.description}
                            </Typography>

                            {selectedJob.skills && selectedJob.skills.length > 0 && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="h6" gutterBottom>Required Skills</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {selectedJob.skills.map((skill, idx) => (
                                            <Chip key={idx} label={skill} sx={{ bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }} />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={handleClose} color="inherit">Close</Button>
                            <Button
                                component={Link}
                                to={`/apply/${selectedJob._id || selectedJob.id}`}
                                variant="contained"
                                disabled={!role || role.toUpperCase() !== 'JOBSEEKER'}
                            >
                                Apply Now
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}
