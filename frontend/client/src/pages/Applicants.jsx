import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Avatar
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useAlert } from "../context/AlertContext";

export default function Applicants() {
    const { id } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();

    const fetchApplicants = async () => {
        try {
            const res = await api.get(`/applications/job/${id}`);
            setApplications(res.data.applicants);
        } catch {
            showAlert("Failed to fetch applicants", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    const updateStatus = async (applicationId, status) => {
        try {
            await api.put(`/applications/${applicationId}`, { status });
            setApplications(applications.map(app =>
                (app._id || app.id) === applicationId ? { ...app, status } : app
            ));
            showAlert(`Status updated to ${status}`, "success");
        } catch {
            showAlert("Failed to update status", "error");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 5 }}>
            <Container maxWidth="lg">
                <Typography variant="h5" fontWeight={600} mb={3}>
                    Applicants
                </Typography>

                {applications.length === 0 ? (
                    <Typography color="text.secondary">
                        No applicants yet for this job.
                    </Typography>
                ) : (
                    <Grid container spacing={2}>
                        {applications.map(app => {
                            const applicationId = app._id || app.id;

                            return (
                                <Grid item xs={12} key={applicationId}>
                                    <Card
                                        sx={{
                                            borderRadius: 2,
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                            transition: "0.2s",
                                            "&:hover": {
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ px: 3, py: 2.5 }}>
                                            <Grid container spacing={2} alignItems="center">

                                                {/* Applicant Info */}
                                                <Grid item xs={12} md={6}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Avatar
                                                            sx={{
                                                                width: 48,
                                                                height: 48,
                                                                mr: 2,
                                                                bgcolor: "grey.900"
                                                            }}
                                                        >
                                                            <PersonIcon />
                                                        </Avatar>

                                                        <Box>
                                                            <Typography fontWeight={600}>
                                                                {app.user.name}
                                                            </Typography>

                                                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                                                <EmailIcon sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }} />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {app.user.email}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                                {/* Status Control */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>Status</InputLabel>
                                                        <Select
                                                            value={app.status}
                                                            label="Status"
                                                            onChange={(e) =>
                                                                updateStatus(applicationId, e.target.value)
                                                            }
                                                            sx={{
                                                                bgcolor: "#fff",
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            <MenuItem value="APPLIED">
                                                                <Chip label="Applied" size="small" />
                                                            </MenuItem>

                                                            <MenuItem value="SHORTLISTED">
                                                                <Chip label="Shortlisted" color="success" size="small" />
                                                            </MenuItem>

                                                            <MenuItem value="REJECTED">
                                                                <Chip label="Rejected" color="error" size="small" />
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
