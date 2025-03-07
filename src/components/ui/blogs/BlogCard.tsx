import { Link } from "react-router";
import { Card, CardActionArea, CardContent, Typography, Chip, Box } from "@mui/material";
import { IBlog } from "../../../libs/types";

export const BlogCard = ({ blog }: { blog: IBlog }) => {
    return (
        <Card sx={{ bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}>
            <CardActionArea component={Link} to={`/blogs/${blog.id}`} className="h-full">
                <CardContent>
                    <Typography variant="h6" component="h2" color="text.primary" gutterBottom>
                        {blog.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {blog.body.length > 100 ? `${blog.body.slice(0, 100)}...` : blog.body}
                    </Typography>

                    {/* Tags Section */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                        {blog.tags?.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "grey.200" }} />
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, color: "text.secondary" }}>
                        <Typography variant="caption">👍 {blog.reactions?.likes ?? 0}</Typography>
                        <Typography variant="caption">👎 {blog.reactions?.dislikes ?? 0}</Typography>
                        <Typography variant="caption">👀 {blog.views ?? 0}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
