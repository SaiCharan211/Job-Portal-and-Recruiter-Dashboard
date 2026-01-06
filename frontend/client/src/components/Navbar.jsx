import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const navigate = useNavigate();
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [name, setName] = useState(localStorage.getItem("name"));

    useEffect(() => {
        const handleAuthChange = () => {
            setRole(localStorage.getItem("role"));
            setName(localStorage.getItem("name"));
        };

        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
    };

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: '#1e293b', // Professional Slate 800
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            top: 0,
            zIndex: 1100
        }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to="/"
                            color="inherit"
                            sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                letterSpacing: '0.5px',
                                textDecoration: 'none',
                                '&:hover': { opacity: 0.9 }
                            }}
                        >
                            <WorkIcon sx={{ fontSize: 32 }} />
                            SmartHire
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {(role === "RECRUITER" || role === "recruiter") && (
                                <Button
                                    component={Link}
                                    to="/recruiter"
                                    color="inherit"
                                    startIcon={<DashboardIcon />}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                                    }}
                                >
                                    Dashboard
                                </Button>
                            )}

                            <Button
                                component={Link}
                                to="/jobs"
                                color="inherit"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                                }}
                            >
                                Jobs
                            </Button>

                            {(role === "JOBSEEKER" || role === "jobseeker") && (
                                <Button
                                    component={Link}
                                    to="/applications"
                                    color="inherit"
                                    startIcon={<AssignmentIcon />}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                                    }}
                                >
                                    My Applications
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {name && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <AccountCircleIcon sx={{ color: 'white', fontSize: 40 }} />
                                <Box sx={{ textAlign: 'left', color: 'white' }}>
                                    <Typography fontWeight="bold" lineHeight={1.2}>{name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', textTransform: 'capitalize' }}>
                                        {role.toLowerCase()}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <Button
                            onClick={logout}
                            variant="contained"
                            startIcon={<LogoutIcon />}
                            sx={{
                                bgcolor: 'white',
                                color: '#1e293b',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                '&:hover': {
                                    bgcolor: '#f1f5f9',
                                    transform: 'translateY(-1px)',
                                    transition: 'all 0.2s'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}