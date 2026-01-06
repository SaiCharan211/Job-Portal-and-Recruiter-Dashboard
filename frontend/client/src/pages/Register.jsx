import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography, Box, Alert, Link, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("JOBSEEKER");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5' }}>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
                        Create Account
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                        Join SmartHire today
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email Address"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Typography variant="subtitle2" sx={{ mt: 1 }}>I am a:</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={role}
                            exclusive
                            onChange={(e, newRole) => { if (newRole) setRole(newRole); }}
                            fullWidth
                        >
                            <ToggleButton value="JOBSEEKER">Job Seeker</ToggleButton>
                            <ToggleButton value="RECRUITER">Recruiter</ToggleButton>
                        </ToggleButtonGroup>

                        <Button variant="contained" size="large" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>
                            Register
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <Link component="button" variant="body2" onClick={() => navigate("/")}>
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}