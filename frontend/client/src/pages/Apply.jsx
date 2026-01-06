import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Chip,
    Divider,
    LinearProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useAlert } from "../context/AlertContext";

export default function Apply() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [resumeText, setResumeText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || (role && role.toUpperCase() !== 'JOBSEEKER')) {
            showAlert("You must be logged in as a Job Seeker to apply.", "error");
            navigate("/login", { replace: true });
        }
    }, [navigate, showAlert]);

    const applyJob = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await api.post(`/applications/apply/${id}`, { resumeText });
            setResult(res.data);
            showAlert("Application processed successfully!", "success");
        } catch (error) {
            showAlert(error.response?.data?.message || "Application failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f5f5f5',
            py: 6
        }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Apply for Job
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Submit your resume to get an instant ATS score.
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={15}
                        variant="outlined"
                        placeholder="Paste your resume text here..."
                        value={resumeText}
                        onChange={e => setResumeText(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    {loading && <LinearProgress sx={{ my: 2 }} />}

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        endIcon={<SendIcon />}
                        onClick={applyJob}
                        disabled={!resumeText.trim() || loading}
                        sx={{
                            py: 1.5,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'none',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                            },
                            '&.Mui-disabled': {
                                background: '#ccc'
                            }
                        }}
                    >
                        {loading ? 'Processing...' : 'Submit and Analyze'}
                    </Button>

                    {result && (
                        <Box sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 3 }} />
                            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9ff', borderRadius: 2, border: '2px solid #667eea' }}>
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <AssessmentIcon sx={{ color: '#667eea', mr: 1 }} />
                                        <Typography variant="h6" fontWeight="bold">ATS Score</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h2" fontWeight="bold" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            {result.atsScore}%
                                        </Typography>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <LinearProgress variant="determinate" value={result.atsScore} sx={{ height: 10, borderRadius: 5, '& .MuiLinearProgress-bar': { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' } }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Matched Skills</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                        {result.matchedSkills?.length > 0 ? (
                                            result.matchedSkills.map((skill, index) => (
                                                <Chip key={index} label={skill} icon={<CheckCircleIcon />} sx={{ bgcolor: 'white', color: '#667eea', fontWeight: 'bold', border: '2px solid #667eea' }} />
                                            ))
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">No skills matched from the job description.</Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}