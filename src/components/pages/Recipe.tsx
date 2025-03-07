import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography, Box, CircularProgress, Chip, Stack, Card, CardContent } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { getRecipe } from "../../libs/apicalls/recipes"; // API function
import { IRecipe } from "../../libs/types";

const Recipe = () => {
    const { id } = useParams<{ id: string }>(); // Get recipe ID from URL params

    const { data: recipe, isLoading, error } = useQuery<IRecipe>({
        queryKey: ["recipe", id],
        queryFn: async () => await getRecipe(id as string),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !recipe) {
        return (
            <Typography color="error" textAlign="center" mt={4}>
                Recipe not found. Please try again.
            </Typography>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 8 }}>
            <Box
                component="img"
                src={recipe.image}
                alt={recipe.name}
                sx={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 2, mb: 3 }}
            />

            <Typography variant="h3" fontWeight="bold" textAlign="center">
                {recipe.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
                {recipe.cuisine} • {recipe.difficulty}
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 3 }}>
                <Chip icon={<TimerIcon />} label={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins`} color="secondary" />
                <Chip icon={<RestaurantIcon />} label={`Serves ${recipe.servings}`} color="primary" />
                <Chip icon={<LocalFireDepartmentIcon />} label={`${recipe.caloriesPerServing} kcal`} color="error" />
            </Stack>

            <Card sx={{ mb: 3, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        🛒 Ingredients
                    </Typography>
                    <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <Typography variant="body1">✅ {ingredient}</Typography>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card sx={{ p: 2 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        🍳 Instructions
                    </Typography>
                    <ol style={{ paddingLeft: "1rem", margin: 0 }}>
                        {recipe.instructions.map((step, index) => (
                            <li key={index}>
                                <Typography variant="body1">{index + 1}. {step}</Typography>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Recipe;
