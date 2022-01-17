import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import config from "../resources/config"
import apiFetch from "../resources/apiFetch"
import { useEffect, useState } from "react/cjs/react.development";
import Context from "../context/Context";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Product = () => {
    const params = useParams();
    const [id, setId] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [productDetail, setproductDetail] = useState(false)

    const {cart, thisProductIsInCart, addProduct, removeProduct} = useContext(Context);
    const [productBtnIcon, setProductBtnIcon] = useState();
    
    const notify = (id, msg ) => {
        if(! toast.isActive(id)) {
            toast.success(msg, {
                toastId: id,
                hideProgressBar: true
            })
        }
    };
    
    const fetchProductDetail = async ( productId ) => {
        const response = await apiFetch.get(
            `${config.endpointUrl}/products/${productId}`
        )
        const productDetail = response.data
        setproductDetail(productDetail)
        setIsLoaded(1)
    }

    const handlerAddTocart = () => {
        console.log( 'click', id )
        console.log( thisProductIsInCart(id) )
        if( thisProductIsInCart(id) ){
            notify(id, "Removed from cart!")
            removeProduct(id);
            
        } else {
            notify(id, "Added to cart!")
            addProduct( productDetail )
        }
        console.log( cart )
    }

    useEffect(() => {
        fetchProductDetail( params.productId );
        setId( params.productId )
    }, [])

    useEffect(() => {
        if (thisProductIsInCart(id)) {
            setProductBtnIcon( 0 );
        } else {
            setProductBtnIcon( 1 );
        }
    }, [cart])

    return(
        <>
            <Navbar />
            <ToastContainer />


            <main className="my-8">
                { ! isLoaded && ! productDetail ? (<p>cargando..</p>) : 
                (<div className="container mx-auto px-6">
                    {/* <h2>Single product: {params.productId}</h2> */}
                    <div className="md:flex md:items-center">
                        <div className="w-full h-64 md:w-1/2 lg:h-96">
                            <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={productDetail.image} alt={productDetail.title} />
                        </div>
                        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                            <h3 className="text-gray-700 uppercase text-lg">{productDetail.title}</h3>
                            <span className="text-gray-500 mt-3">$ {productDetail.price}</span>
                            <p className="text-red-500 text-xs w-20">{productDetail.category[0].name}</p>
                            <p className="text-gray-500 mt-3">{productDetail.excerpt}</p>
                            <hr className="my-3" />
                            <div className="mt-2">
                                <label className="text-gray-700 text-sm" >Add to cart:</label>
                            </div>
                            <div className="flex items-center mt-6">
                                <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none" onClick={handlerAddTocart}>
                                    { productBtnIcon ? ( 
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>    
                                    ) : (
                                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
                                    ) }
                                </button>
                            </div>
                        </div>
                    </div>

                </div> ) }
            </main>
        </>
    )
}

export default Product;