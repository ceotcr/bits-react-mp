import { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../libs/apicalls/products";
import { IProduct } from "../../libs/types";
import { useSnackbar } from "../../store/snackbarStore";
import { useProducts } from "../../store/productsStore";
import { Pagination } from "@mui/material";
import Filters from "../ui/products/Filters";
import { filterReducer } from "../../libs/reducers/productFilter";

const initialFilters = {
    search: "",
    sortBy: "default",
    order: "asc",
    category: "all",
    page: 1,
};

const Products = () => {
    const { showSnackbar } = useSnackbar();
    const { products, setProducts, pages } = useProducts()
    const [filters, dispatch] = useReducer(filterReducer, initialFilters);

    const { isLoading, isError, error } = useQuery<IProduct[]>({
        queryKey: ["products", filters],
        queryFn: async () => {
            const data = await getProducts(filters);
            showSnackbar({ message: "Products loaded", severity: "success" });
            setProducts({ products: data.products, pages: data.pages });
            return data.products;
        },
        refetchOnWindowFocus: false,
        retry: 1,
    });

    if (isError) return <div>{error.name}: {error.message}</div>;

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Filters filters={filters} dispatch={dispatch} />
            {isLoading && <div>Loading...</div>}
            {products && (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pb-20">
                        {products.map((product) => (
                            <div key={product.id}>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                            </div>
                        ))}
                    </div>
                    <Pagination className="fixed bottom-4 bg-white p-2 rounded-lg right-4" count={pages} shape="rounded" page={filters.page} onChange={(_e, value) => dispatch({ type: "SET_PAGE", payload: String(value) })} />
                </>
            )}
        </div>
    );
};

export default Products;
