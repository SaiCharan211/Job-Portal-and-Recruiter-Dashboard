import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from "@mui/material";
import { AlertProvider } from "./context/AlertContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Apply from "./pages/Apply";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern Blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#db2777', // Modern Pink
      light: '#f472b6',
      dark: '#9d174d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f3f4f6', // Light Gray
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/applications"
                  element={
                    <ProtectedRoute>
                      <MyApplications />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/apply/:id"
                  element={
                    <ProtectedRoute>
                      <Apply />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/applicants/:id"
                  element={
                    <ProtectedRoute>
                      <Applicants />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path="/recruiter"
                  element={
                    <ProtectedRoute>
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/post-job"
                  element={
                    <ProtectedRoute>
                      <PostJob />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/applicants/:id"
                  element={
                    <ProtectedRoute>
                      <Applicants />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Container>
          </Box>
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  );
}
