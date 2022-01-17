import React, {useEffect, useState} from "react"
import Navbar from "../components/Navbar";
import ProductItem from "../components/ProductItem";
import config from "../resources/config"
import apiFetch from "../resources/apiFetch"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = props => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [products, setProducts] = useState([])
    
    const fetchProducts = async () => {
        const response = await apiFetch.get(
            `${config.endpointUrl}/products`
        )
        const products = response.data
        setProducts(products)

    }

    useEffect(() => {
        fetchProducts();
        setIsLoaded(1)
    }, [])

    return(
    <>
        <Navbar />
        <ToastContainer />
        <main className="my-8">
            <div className="container mx-auto px-6">
                <h1 className="font-semibold text-2xl mb-4">Products</h1>
                { ! isLoaded ? (<p>cargando..</p>) : (
                    
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    { products.map( product => (
                        <ProductItem product={product} />
                    ) ) }
                    </div>

                ) }
            </div>
        </main>
    </>
    );
}

export default Home;