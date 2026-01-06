import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography, Box, Alert, Link } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("name", res.data.user.name);
            console.log('Logged in as role:', res.data.user.role);
            localStorage.setItem("email", res.data.user.email);
            window.dispatchEvent(new Event("auth-change"));
            if (res.data.user.role === 'RECRUITER') {
                navigate("/recruiter");
            } else {
                navigate("/jobs");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5' }}>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom color="primary">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to your account
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                        <Button variant="contained" size="large" fullWidth onClick={handleLogin} sx={{ mt: 1 }}>
                            Sign In
                        </Button>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Link component="button" variant="body2" onClick={() => navigate("/register")}>
                                    Create Account
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}