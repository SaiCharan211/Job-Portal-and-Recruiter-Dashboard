import { useEffect, useState } from "react";
import api from "../services/api";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Grid,
    LinearProgress
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import StarIcon from '@mui/icons-material/Star';
export default function MyApplications() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/applications/my").then(res => {
            console.log(res.data);
            setApps(res.data.applications);
            setLoading(false);
        });
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SHORTLISTED': return 'success';
            case 'REJECTED': return 'error';
            case 'APPLIED': return 'info';
            default: return 'default';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'SHORTLISTED': return <StarIcon />;
            case 'REJECTED': return <CancelIcon />;
            case 'APPLIED': return <HourglassEmptyIcon />;
            default: return <AssignmentIcon />;
        }
    };

    if (loading) {
        return (
            <Box sx={{ width: '100%', mt: 4 }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f5f5f5',
            py: 6
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        My Applications
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Track your job application status
                    </Typography>
                    <Box sx={{
                        width: 80,
                        height: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 2,
                        mt: 2
                    }} />
                </Box>

                {/* Applications List */}
                {apps.length === 0 ? (
                    <Box sx={{
                        textAlign: 'center',
                        py: 10,
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: 1
                    }}>
                        <AssignmentIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" fontWeight="bold" color="text.secondary" gutterBottom>
                            No applications yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Start applying to jobs to see them here
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {apps.map(app => (
                            <Grid item xs={12} key={app._id}>
                                <Card sx={{
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-2px)'
                                    },
                                    border: '1px solid #e0e0e0'
                                }}>
                                    {/* Status Bar */}
                                    <Box sx={{
                                        height: 6,
                                        background: app.status === 'SHORTLISTED'
                                            ? 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
                                            : app.status === 'REJECTED'
                                                ? 'linear-gradient(135deg, #f44336 0%, #e57373 100%)'
                                                : 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)'
                                    }} />

                                    <CardContent sx={{ p: 4 }}>
                                        <Grid container spacing={3} alignItems="center">
                                            {/* Job Details */}
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                    {app.job.title}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                                    {app.job.location || 'Location not specified'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </Grid>

                                            {/* Status and Score */}
                                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 2,
                                                    alignItems: { xs: 'flex-start', md: 'flex-end' }
                                                }}>
                                                    <Chip
                                                        icon={getStatusIcon(app.status)}
                                                        label={app.status}
                                                        color={getStatusColor(app.status)}
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            px: 1,
                                                            fontSize: '0.9rem'
                                                        }}
                                                    />

                                                    {/* ATS Score */}
                                                    <Box sx={{
                                                        bgcolor: '#f8f9ff',
                                                        p: 2,
                                                        borderRadius: 2,
                                                        border: '2px solid #667eea',
                                                        minWidth: 200
                                                    }}>
                                                        <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" gutterBottom>
                                                            ATS SCORE
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Typography
                                                                variant="h4"
                                                                fontWeight="bold"
                                                                sx={{
                                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent'
                                                                }}
                                                            >
                                                                {app.atsScore}%
                                                            </Typography>
                                                            <Box sx={{ flexGrow: 1 }}>
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={app.atsScore}
                                                                    sx={{
                                                                        height: 8,
                                                                        borderRadius: 5,
                                                                        bgcolor: '#e0e0e0',
                                                                        '& .MuiLinearProgress-bar': {
                                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                                        }
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        {/* Matched Skills */}
                                        {app.matchedSkills && app.matchedSkills.length > 0 && (
                                            <Box sx={{ mt: 3 }}>
                                                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                                    Matched Skills:
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                    {app.matchedSkills.map((skill, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={skill}
                                                            size="small"
                                                            icon={<CheckCircleIcon />}
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
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}