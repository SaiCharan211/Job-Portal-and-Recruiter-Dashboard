import { AppBar, Toolbar, Typography, Button, Box, Chip, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        console.log('Auth change detected', role);
        if (token && role && name) {
            setUser({ role, name });
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
        // Listen for custom event to update state immediately after login/logout
        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
    };

    return (
        <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={user?.role === 'RECRUITER' ? '/recruiter' : '/jobs'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'primary.main',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        SmartHire
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Hi, {user.name}
                                </Typography>
                                <Chip
                                    label={user.role === 'RECRUITER' ? 'Recruiter' : 'Job Seeker'}
                                    color={user.role === 'RECRUITER' ? 'secondary' : 'primary'}
                                    size="small"
                                    variant="outlined"
                                />
                                {user.role === 'RECRUITER' ? (
                                    <>
                                        <Button component={Link} to="/jobs" color="inherit">Jobs</Button>
                                        <Button component={Link} to="/recruiter" color="inherit">My Jobs</Button>
                                        <Button component={Link} to="/post-job" color="inherit">Post Job</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button component={Link} to="/jobs" color="inherit">Jobs</Button>
                                        <Button component={Link} to="/applications" color="inherit">My Applications</Button>
                                    </>
                                )}
                                <Button onClick={handleLogout} variant="outlined" color="error" size="small">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/" color="inherit">Login</Button>
                                <Button component={Link} to="/register" variant="contained" size="small">Register</Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}