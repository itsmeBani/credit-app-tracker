import {useEffect, useState} from "react";
import ModelProducts from "../../../local_database/model/model.products";
import {useDebounce} from "../../../shared/hooks/useDebounce";
import {ProductRepository} from "../data/product.repository";

type UseFetchProductsReturn = {
    products: ModelProducts[];
    loading: boolean;
    error: unknown;
};

export const useFetchProducts = (
    search: string
): UseFetchProductsReturn => {
    const [products, setProducts] = useState<ModelProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const debounceSearch = useDebounce(search, 500);


    useEffect(() => {

        const getProducts = async () => {
            try {
                const productRepository = new ProductRepository();
                const result = await productRepository.getAllProducts(debounceSearch).fetch();

                setProducts(result);
            } catch (error) {
                setError(error)
                console.log("GET PRODUCTS ERROR:", error);
            }finally {
                setLoading(false)
            }
        };
        getProducts().then()
    }, [debounceSearch]);

    return {
        products,
        loading,
        error,
    };
};