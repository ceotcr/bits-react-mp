import React, { useState } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useCommentsStore } from "../../../store/commentsStore";
import { useMutation } from "@tanstack/react-query";
import { IComment } from "../../../libs/types";
import { addComment as addCommentAPI } from "../../../libs/apicalls/blogs"
import { useAuth } from "../../../store/authStore";
const AddCommentForm = ({ setComments, postId }: {
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>; postId: number
}) => {
    const [comment, setComment] = useState("");
    const { addComment } = useCommentsStore();
    const { user } = useAuth()
    const { mutate, error, isPending } = useMutation<IComment>({
        mutationFn: async () => {
            if (!user) throw new Error('Sign in to comment')
            return await addCommentAPI({
                body: comment,
                userId: user?.id,
                postId
            })
        },
        onSuccess: (data) => {
            addComment(data)
            setComments((prev) => [data, ...prev])
            setComment("")
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate()
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2}>
                <TextField
                    label="Write a comment..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" disabled={isPending}>
                    Add Comment
                </Button>
                {error && <p>{error.message}</p>}
            </Stack>
        </Box>
    );
};

export default AddCommentForm;
