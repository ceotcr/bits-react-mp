import { Card, CardContent, Typography, CircularProgress, Container, Box, Pagination, Chip, CardMedia, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRecipes } from "../../libs/apicalls/recipes"; // API call function
import { IRecipe } from "../../libs/types";
import TimerIcon from "@mui/icons-material/Timer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Link } from "react-router";
import { useAuth } from "../../store/authStore";
import { useSnackbar } from "../../store/snackbarStore";

const Recipes = () => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const { data: recipes, isLoading, error } = useQuery<IRecipe[]>({
        queryKey: ["recipes", page],
        queryFn: async () => {
            const res = await getRecipes({ limit: 6, page });
            setPages(res.pages);
            return res.recipes;
        },
        refetchOnWindowFocus: false,
    });
    const { user } = useAuth()
    const { showSnackbar } = useSnackbar()
    useEffect(() => {

        if (!user) {
            showSnackbar({ message: 'Welcome Guest', severity: 'success' })
        }
    }, [user])
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" textAlign="center" mt={4}>
                Failed to load recipes. Please try again later.
            </Typography>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, pb: 8 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                🍽️ Delicious Recipes
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {recipes?.map((recipe) => (
                    <Card
                        key={recipe.id}
                        sx={{
                            my: 3,
                            boxShadow: 3,
                            transition: "0.3s",
                            "&:hover": { boxShadow: 6 }
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={recipe.image}
                            alt={recipe.name}
                            sx={{ objectFit: "cover", width: "100%", height: 200 }}
                        />
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                                {recipe.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {recipe.cuisine} • {recipe.difficulty}
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                                <Chip icon={<TimerIcon />} label={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins`} color="secondary" />
                                <Chip icon={<RestaurantIcon />} label={`Serves ${recipe.servings}`} color="primary" />
                                <Chip icon={<LocalFireDepartmentIcon />} label={`${recipe.caloriesPerServing} kcal`} color="error" />
                            </Stack>

                            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                                {recipe.tags?.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" color="primary" />
                                ))}
                            </Box>
                            <Link to={`/recipes/${recipe.id}`} className="block mt-2 bg-blue-500 text-white p-2 rounded-md text-center">
                                View Recipe
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination count={pages} page={page} onChange={(_e, p) => setPage(p)} sx={{ mt: 4, display: "flex", justifyContent: "center" }} className="fixed bottom-4 bg-white p-2 rounded-lg right-4" />
        </Container>
    );
};

export default Recipes;
