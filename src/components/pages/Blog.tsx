import { Link, useNavigate, useParams } from "react-router";
import { IBlog, IComment } from "../../libs/types";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../../libs/apicalls/blogs";
import { Container, Typography, Box, Chip, Stack, Divider, Avatar, CircularProgress } from "@mui/material";
import AddCommentForm from "../ui/blogs/CommentForm";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useAuth } from "../../store/authStore";

const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState([] as IComment[])
    const { data: blog, isLoading: loading } = useQuery<IBlog>({
        queryKey: ['blog', id],
        queryFn: async () => {
            const data = await getBlog(id as string);
            setComments(data.comments)
            return data;
        },
        refetchOnWindowFocus: false,
    });

    const navigate = useNavigate()
    const { user: authUser } = useAuth()

    if (!authUser || ["admin", "user", "moderator"].includes(authUser.role) === false) {
        navigate('/login')
        return null
    }

    if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
    if (!blog) return <Typography textAlign="center" color="error" mt={4}>Blog not found.</Typography>;

    return (
        <Container maxWidth="md" className="!pt-12">

            <Link to="/blogs" className="flex items-center gap-1 text-gray-600 hover:text-gray-800 mb-4">
                <MdArrowBack size={24} />
                <span>Back to Blogs</span>
            </Link>
            <Typography variant="h2" fontWeight="bold">{blog.title}</Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary", fontSize: "1.5rem" }}>{blog.body}</Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, }}>
                {blog.tags.map(tag => (
                    <Chip key={tag} label={`#${tag}`} sx={{ fontSize: "1.1rem" }} variant="outlined" />
                ))}
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 3, color: "text.secondary" }}>
                <Typography>👍 {blog.reactions.likes}</Typography>
                <Typography>👎 {blog.reactions.dislikes}</Typography>
                <Typography>👀 {blog.views} views</Typography>
            </Stack>

            <AddCommentForm setComments={setComments} postId={blog.id} />
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Comments ({comments.length})</Typography>
                <Divider sx={{ my: 2 }} />

                {comments.length === 0 ? (
                    <Typography color="text.secondary">No comments yet.</Typography>
                ) : (
                    comments.map(comment => (
                        <Box key={comment.id} sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
                            <Avatar>{comment.user.fullName[0]}</Avatar>
                            <Box>
                                <Typography fontWeight="bold">{comment.user.fullName} (@{comment.user.username})</Typography>
                                <Typography variant="body2">{comment.body}</Typography>
                                <Typography variant="caption" color="text.secondary">👍 {comment.likes || 0} likes</Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Container>
    );
};

export default Blog;
