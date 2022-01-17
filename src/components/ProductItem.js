import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductItem = ({product}) => {
    const {id, image, title, price, category} = product;
    const {cart, thisProductIsInCart, addProduct, removeProduct} = useContext(Context);
    const [productBtnIcon, setProductBtnIcon] = useState(0);
    
    const notify = (id, msg ) =>{ 
        if(! toast.isActive(id)) {
            toast.success(msg, { 
                toastId: id,
                hideProgressBar: true 
            })
        }
    };

    const handlerAddTocart = () => {
        if( thisProductIsInCart(id) ){
            notify(id, "Removed from cart!")
            removeProduct(id);
        } else {
            notify(id, "Added to cart!")
            addProduct( product )
        }
    }

    useEffect(() => {
        if (thisProductIsInCart(id)) {
            setProductBtnIcon( 0 );
        } else {
            setProductBtnIcon( 1 );
        }
    }, [cart])

    return(
        <li key={id.toString()} className="list-none">
            
            <Link to={`/product/${id}`} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img src={image} alt={title} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                    {title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                    $ {price}.00
                    { productBtnIcon }
                </p>
            </Link>
            <span className="text-red-500 text-xs w-20">{category[0].name}</span>
            <button className="float-right mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none" onClick={handlerAddTocart} >
                
                { productBtnIcon ? ( 
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>    
                ) : (
                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
                ) }
            </button>
        </li>
    )
}

export default ProductItem;