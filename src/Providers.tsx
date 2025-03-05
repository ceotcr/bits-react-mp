import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { BrowserRouter } from "react-router"
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
    key: 'css',
    prepend: true,
});

const client = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={client}>
                <StyledEngineProvider injectFirst>
                    <CacheProvider value={cache}>
                        {children}
                    </CacheProvider>
                </StyledEngineProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default Providers