import { useCallback, useReducer, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProductAPI, getCategories, getProducts } from "../../libs/apicalls/products";
import { IProduct } from "../../libs/types";
import { useSnackbar } from "../../store/snackbarStore";
import { useProducts } from "../../store/productsStore";
import { Pagination } from "@mui/material";
import Filters from "../ui/products/Filters";
import { filterReducer } from "../../libs/reducers/productFilter";
import ProductCard from "../ui/products/ProductCard";
import Confirmation from "../base/Confirmation";

const initialFilters = {
    search: "",
    sortBy: "default",
    order: "asc",
    category: "all",
    page: 1,
};

const Products = () => {
    const { showSnackbar } = useSnackbar();
    const { products, setProducts, pages, removeProduct } = useProducts()
    const [filters, filterDispatch] = useReducer(filterReducer, initialFilters);

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const { isLoading, isError, error } = useQuery<IProduct[]>({
        queryKey: ["products", filters],
        queryFn: async () => {
            const data = await getProducts(filters);
            setProducts({ products: data.products, pages: data.pages });
            return data.products;
        },
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnMount: false,
    });
    const [confirmDelete, setConfirmDelete] = useState({
        show: false,
        id: 0
    });
    const {
        mutate: deleteProduct,
        isPending: isDeleting,
    } = useMutation({
        mutationFn: async (id: number) => {
            const res = await deleteProductAPI(id);
            return res;
        },
        onSuccess: (data) => {
            removeProduct(data.id)
            showSnackbar({ message: "Product deleted successfully", severity: "success" });
            setConfirmDelete({
                show: false,
                id: 0
            })
        },
        onError: () => {
            showSnackbar({ message: "Failed to delete product", severity: "error" });
            setConfirmDelete({
                show: false,
                id: 0
            })
        },
        retry: 1
    })

    const handleDialogClose = useCallback(() => {
        setConfirmDelete({
            show: false,
            id: 0
        })
    }, [])

    const handleDialogYes = useCallback(() => {
        deleteProduct(confirmDelete.id);
    }, [confirmDelete.id, deleteProduct])

    const handleDialogNo = useCallback(() => {
        setConfirmDelete({
            show: false,
            id: 0
        })
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Filters categories={categories || []} filters={filters} dispatch={filterDispatch} />
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.name}: {error.message}</div>}
            {products && (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pb-20">
                        {
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} onDelete={() => {
                                    setConfirmDelete({
                                        show: true,
                                        id: product.id
                                    })
                                }} />
                            ))
                        }
                    </div>
                    <Pagination className="fixed bottom-4 bg-white p-2 rounded-lg right-4" count={pages} shape="rounded" page={filters.page} onChange={(_e, value) => filterDispatch({ type: "SET_PAGE", payload: String(value) })} />
                </>
            )}
            {
                confirmDelete.show &&
                <Confirmation title="Delete Product" description={`Are you sure you want to delete the product "${products.find((product) => product.id === confirmDelete.id)?.title}" ?`}
                    isLoading={isDeleting}
                    open={confirmDelete.show}
                    handleClose={handleDialogClose}
                    handleYes={handleDialogYes}
                    handleNo={handleDialogNo}
                />
            }
        </div>
    );
};

export default Products;
