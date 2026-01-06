import { useState } from "react";
import { Container, Box, Tabs, Tab, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Jobs from "./Jobs";
import MyApplications from "./MyApplications";

export default function JobSeekerDashboard() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Job Seeker Dashboard
                    </Typography>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="job seeker tabs">
                        <Tab label="Available Jobs" icon={<WorkIcon />} iconPosition="start" />
                        <Tab label="My Applications" icon={<AssignmentIcon />} iconPosition="start" />
                    </Tabs>
                </Box>

                {tabValue === 0 && <Jobs />}
                {tabValue === 1 && <MyApplications />}
            </Container>
        </Box>
    );
}