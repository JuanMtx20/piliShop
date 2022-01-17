import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import apiFetch from "../resources/apiFetch";
import config from "../resources/config"
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('')
    const [passw, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handlerSubmit = async () => {

        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', passw); 
        bodyFormData.append('name', 'react-app'); 

        const loginResponse = await apiFetch.post(
            `${config.loginUrl}`,
            bodyFormData,
        )

        if (loginResponse.status == 200 ) {
            localStorage.setItem( 'token', loginResponse.data.token );
            localStorage.setItem( 'userName', loginResponse.data.name );
            localStorage.setItem( 'useRole', loginResponse.data.roles[0].name );
            localStorage.setItem( 'userEmail', email );
            navigate("/");
        } else {
            setMessage( loginResponse.message )
        }
        
    }

    return(
        <>
            <Navbar />
            <div className="bg-gray-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center ">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Login</h1>

                        <input 
                            type="text"
                            className="block border border-gray-light w-full p-3 rounded mb-4"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email" />

                        <input 
                            type="password"
                            className="block border border-gray-light w-full p-3 rounded mb-4"
                            onChange={e => setPassword(e.target.value)}
                            value={passw}
                            name="password"
                            placeholder="Password" />

                        
                        { message !== '' ? 
                        (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">{message}</strong>
                        </div> ) : '' }

                        <button
                            onClick={handlerSubmit}
                            className="w-full text-center py-3 rounded bg-indigo-900 text-white hover:bg-indigo-700 focus:outline-none my-1"
                        >Create Account</button>

                        <div className="text-center text-sm text-gray-400 mt-4">
                            By signing up, you agree to the &nbsp;
                            <Link className="no-underline border-b border-gray-400 text-gray-400" to="#">
                                Terms of Service
                            </Link> and &nbsp;
                            <Link className="no-underline border-b border-gray-400 text-gray-400" to="#">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    <div className="text-gray-400 mt-6">
                        Don't have an account? &nbsp;
                        <Link className="no-underline border-b border-blue text-indigo-500" to="/SignUp/">
                            Sign Up
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;