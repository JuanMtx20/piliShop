import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItem = ({item}) => {
    const {id, image, title, price, category} = item;
    const {removeProduct} = useContext(Context);

    const notify = (id, msg ) =>{ 
        if(! toast.isActive(id)) {
            toast.success(msg, { 
                toastId: id,
                hideProgressBar: true 
            })
        }
    };

    const removeFromCart = () => {
        notify(id, "Removed from cart!")
        removeProduct(id);
    }
    
    return(
        <>
        <div key={id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-3/5" >
                <Link to={`/product/${id}`}>
                    <img className="h-24" src={image} alt={title} />
                </Link>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm w-20">
                        <Link to={`/product/${id}`}>
                            {title}
                        </Link>
                    </span>
                    <span className="text-red-500 text-xs w-20">{category[0].name}</span>
                    
                </div>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">${price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">${price}</span>
        </div>
        </>
    )
}

export default CartItem;