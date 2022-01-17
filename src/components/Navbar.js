import React from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../resources/helpers";
import { useNavigate } from 'react-router';
import { useRole } from "../resources/helpers";

const Navbar = () => {
    const navigate = useNavigate();

	const handlerLogout = async () => {
        localStorage.removeItem('token');
		localStorage.removeItem('userEmail');
		localStorage.removeItem( 'userName' );
		localStorage.removeItem( 'useRole' );

        navigate("/");
    }

	return (
		<nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<Link to="/">
					<span className="font-semibold text-xl tracking-tight">Pili Shopping</span>
				</Link>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					<Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
						Products
					</Link>
					<Link to="/cart" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
						Cart
					</Link>
				</div>
				<div>
					{ useRole() === 'Admin' ? 
						( <Link to="/manageProducts" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0 mr-4">Manage Products</Link> )
					: '' }
					
					{ isLoggedIn() ? (
						<>
							
							<button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0" onClick={handlerLogout}>Logout</button>
						</>
					) : (
						<Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">Log In</Link>
					) }
				</div>
			</div>
		</nav>
	);
};

export default Navbar;