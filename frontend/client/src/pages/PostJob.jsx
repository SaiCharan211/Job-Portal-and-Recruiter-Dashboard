import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Chip,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import { useAlert } from "../context/AlertContext";

export default function PostJob() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const submitJob = async () => {
        try {
            const formattedSkills = skills.split(",").map(s => s.trim()).filter(s => s);

            await api.post("/jobs", {
                title,
                description,
                location,
                skills: formattedSkills
            });
            showAlert("Job posted successfully!", "success");
            navigate("/recruiter");
        } catch (error) {
            showAlert("Failed to post job. Please try again.", error);
        }
    };

    const skillsArray = skills ? skills.split(",").map(s => s.trim()).filter(s => s) : [];

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
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            mb: 2
                        }}>
                            <WorkIcon sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Post a New Job
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Fill in the details to create a job posting
                        </Typography>
                    </Box>

                    <Stack spacing={3}>
                        {/* Job Title */}
                        <TextField
                            fullWidth
                            label="Job Title"
                            placeholder="e.g., Senior Software Engineer"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                    }
                                }
                            }}
                        />

                        {/* Job Description */}
                        <TextField
                            fullWidth
                            label="Job Description"
                            placeholder="Describe the role, responsibilities, and requirements..."
                            multiline
                            rows={6}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                    }
                                }
                            }}
                        />

                        {/* Location */}
                        <TextField
                            fullWidth
                            label="Location"
                            placeholder="e.g., Remote, New York, San Francisco"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                    }
                                }
                            }}
                        />

                        {/* Skills */}
                        <Box>
                            <TextField
                                fullWidth
                                label="Required Skills"
                                placeholder="Enter skills separated by commas (e.g., React, Node.js, MongoDB)"
                                value={skills}
                                onChange={e => setSkills(e.target.value)}
                                required
                                helperText="Separate multiple skills with commas"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#667eea',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#667eea',
                                        }
                                    }
                                }}
                            />

                            {/* Skills Preview */}
                            {skillsArray.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                        Skills Preview:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {skillsArray.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                sx={{
                                                    bgcolor: '#f0f0ff',
                                                    color: '#667eea',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={submitJob}
                            disabled={!title || !description || !location || !skills}
                            sx={{
                                py: 1.5,
                                mt: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                },
                                '&.Mui-disabled': {
                                    background: '#ccc',
                                    color: 'white'
                                }
                            }}
                        >
                            Post Job
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/recruiter")}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderColor: '#667eea',
                                color: '#667eea',
                                '&:hover': {
                                    borderColor: '#5568d3',
                                    bgcolor: 'rgba(102, 126, 234, 0.04)'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}