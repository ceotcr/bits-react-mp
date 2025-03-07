import { useNavigate } from "react-router";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { useAuth } from "../../store/authStore";
import { links } from "../ui/layout/SideBar";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Fetch user role

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4, bgcolor: "#f4f6f8" }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Dashboard
            </Typography>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {links
                    .filter(link => link.for.includes(user?.role || "guest"))
                    .map(({ title, icon, to }) => (
                        <div key={to} style={{ margin: 10 }}>
                            <Card
                                sx={{
                                    minWidth: 200,
                                    textAlign: "center",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                                    cursor: "pointer",
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate(to)}
                            >
                                <CardContent>
                                    <IconButton sx={{ color: "primary.main", fontSize: 40 }}>
                                        {icon}
                                    </IconButton>
                                    <Typography variant="h6" fontWeight="medium" color="text.primary">
                                        {title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
            </div>
        </Box>
    );
};

export default Home;
