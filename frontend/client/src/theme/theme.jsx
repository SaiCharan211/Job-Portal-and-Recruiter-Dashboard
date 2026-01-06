
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    Grid,
    Chip,
    Paper,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    ToggleButtonGroup,
    ToggleButton,
    Stack,
    LinearProgress,
    IconButton,
    Divider
} from '@mui/material';
import {
    Work as WorkIcon,
    LocationOn as LocationOnIcon,
    Assignment as AssignmentIcon,
    Logout as LogoutIcon,
    Add as AddIcon,
    Visibility as VisibilityIcon,
    Delete as DeleteIcon,
    Send as SendIcon,
    CheckCircle as CheckCircleIcon,
    Assessment as AssessmentIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Cancel as CancelIcon,
    HourglassEmpty as HourglassEmptyIcon,
    Star as StarIcon
} from '@mui/icons-material';

// Theme Configuration
const theme = createTheme({
    palette: {
        primary: {
            main: '#667eea',
            light: '#8b9ef5',
            dark: '#4c5fd3',
        },
        secondary: {
            main: '#764ba2',
            light: '#9868c7',
            dark: '#5d3a7f',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
            },
        },
    },
});