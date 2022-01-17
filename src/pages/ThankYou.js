import React, {useEffect, useContext} from "react"
import Navbar from "../components/Navbar";
import { userEmail, userName } from "../resources/helpers";
import { Link } from "react-router-dom";
import Context from "../context/Context";


const ThankYou = () => {
    const {clearCart} = useContext(Context);

    useEffect(() => {
        clearCart()
    }, [])

    return(
        <>
            <Navbar />
            <main className="my-8">

                <div className="px-10 mt-10">
                    <div className="bg-white rounded-md max-w-4xl mx-auto p-4 space-y-4 shadow-lg">
                        <h3 className="mb-2 font-semibold">Order received</h3>
                            <div className="pt-2">
                                <h3 className="font-semibold"></h3>
                                    <p className="font-thin mt-2">Thank you. Your order has been received.</p>
                            </div>
                            <h3 className="border-t mb-2 pt-3 font-semibold">Name: <span className="font-thin">{userName()}</span></h3>
                                <h3 className="border-t mb-2 pt-3 font-semibold">Email: <span className="font-thin">{userEmail()}</span></h3>
                    </div>

                    <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">

                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                        Go to home
                    </Link>
                </div>
                        

            </main>
        </>
    )
}

export default ThankYou;