import { Avatar, Box, Container, Divider, Typography } from "@mui/material"
import { useCommentsStore } from "../../store/commentsStore"
import { Link } from "react-router"
import { MdArrowBack } from "react-icons/md"

const MyComments = () => {
    const { mycomments: comments } = useCommentsStore()
    return (
        <Container maxWidth="md" className="!pt-12">
            <Link to="/blogs" className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                <MdArrowBack size={24} />
                <span>Back to Blogs</span>
            </Link>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">My Comments ({comments.length})</Typography>
                <Divider sx={{ my: 2 }} />

                {comments.length === 0 ? (
                    <Typography color="text.secondary">No comments yet.</Typography>
                ) : (
                    comments.map(comment => (
                        <Box key={comment.id} sx={{ display: "flex", alignItems: "start", gap: 2, py: 2 }}>
                            <Avatar>{comment.user.fullName[0]}</Avatar>
                            <Box>
                                <Typography>On Blog #{comment.postId}</Typography>
                                <Typography fontWeight="bold">{comment.user.fullName} (@{comment.user.username})</Typography>
                                <Typography variant="body2">{comment.body}</Typography>
                                <Typography variant="caption" color="text.secondary">👍 {comment.likes || 0} likes</Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Container>
    )
}

export default MyComments