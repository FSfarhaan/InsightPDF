import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        sender: '',
        email: '',
        password: ''
    });
    const [loginMethod, setLoginMethod] = useState("login");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = loginMethod === 'signup' ? 'http://localhost:3001/signup' : 'http://localhost:3001/login';
        const body = loginMethod === 'signup' ? 
            { name: inputs.sender, email: inputs.email, password: inputs.password } :
            { email: inputs.email, password: inputs.password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Something went wrong');
            }
            if(response.ok) {
                if(responseData.token) {
                    const token = responseData.token;
                    localStorage.setItem("token", token);
                    console.log(token);
                }

                navigate('/dashboard');
                
            } else alert("Some error occurred");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSwitch = () => {
        setLoginMethod((prevMethod) => (prevMethod === 'login' ? 'signup' : 'login'));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="bg-white rounded-xl shadow-2xl relative overflow-hidden w-[600px] max-w-full min-h-[480px] flex justify-center items-center p-8">
                <div className="w-full">
                    <form 
                        onSubmit={handleSubmit}
                        className="bg-white flex flex-col items-center justify-center px-12 py-0 h-full text-center w-[90%] mx-auto"
                    >
                        <h1 className="mb-12 text-4xl font-bold text-black">
                            {loginMethod === 'login' ? "LOGIN" : "SIGN UP"}
                        </h1>

                        {loginMethod !== 'login' && (
                            <>
                            <label htmlFor="Name" className='text-black text-left w-full'>Name</label>
                            
                            <input 
                                className="w-full bg-gray-200 border-none py-3 px-5 my-2 rounded-xl text-xl text-black"
                                type="text" 
                                placeholder="Username" 
                                name='sender' 
                                value={inputs.sender} 
                                onChange={handleChange} 
                            /></>
                        )}
                        <label htmlFor="Email" className='text-black text-left w-full'>Email</label>
                        <input 
                            className="w-full bg-gray-200 border-none py-3 px-5 my-2 rounded-xl text-xl text-black"
                            type="email" 
                            placeholder="Email" 
                            name='email'
                            value={inputs.email} 
                            onChange={handleChange} 
                        />
                        <label htmlFor="password" className='text-black text-left w-full'>Password</label>

                        <input 
                            className="w-full bg-gray-200 border-none py-3 px-5 my-2 rounded-xl text-xl text-black"
                            type="password" 
                            placeholder="Password" 
                            name='password'
                            value={inputs.password} 
                            onChange={handleChange} 
                        />

                        <p 
                            className="text-sm font-medium leading-5 tracking-wider my-5 cursor-pointer text-blue-500"
                            onClick={handleSwitch}
                        >
                            Switch to {loginMethod === 'login' ? "Sign up" : "Login"}
                        </p>
                        
                        <button 
                            type='submit'
                            className="w-full bg-purple-500 text-white text-base font-bold py-4 px-8 rounded-xl uppercase tracking-wider"
                        >
                            {loginMethod === 'login' ? "LOGIN" : "SIGNUP"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;