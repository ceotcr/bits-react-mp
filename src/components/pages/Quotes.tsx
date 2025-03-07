import { Card, CardContent, Typography, CircularProgress, Container, Box, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IQuote } from "../../libs/types";
import { getQuotes } from "../../libs/apicalls/quotes";
import { useState } from "react";

const Quotes = () => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const { data: quotes, isLoading, error } = useQuery<IQuote[]>({
        queryKey: ["quotes", page],
        queryFn: async () => {
            const res = await getQuotes({ limit: 10, page: page });
            setPages(res.pages);
            return res.quotes;
        },
        refetchOnWindowFocus: false,
    });

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
                Failed to load quotes. Please try again later.
            </Typography>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 8 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                Inspirational Quotes
            </Typography>

            {quotes?.map((quote) => (
                <Card key={quote.id} sx={{ my: 2, p: 2, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h6" color="text.primary">
                            "{quote.quote}"
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "right" }}>
                            - {quote.author}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            <Pagination count={pages} page={page} onChange={(_e, p) => setPage(p)} className="fixed bottom-4 bg-white p-2 rounded-lg right-4" />
        </Container>
    );
};

export default Quotes;
