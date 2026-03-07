import React, { useState } from 'react'
import Container from '../../components/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../../components/ui/button'
import { NavLink, useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { loginUser } from '../../api/authApi'
import useAuthStore from '../../store/useAuthStore'

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const[form,setForm] = useState({
        email: '', password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Form data being sent:", form);
            try {
                setLoading(true);
                const data = await loginUser(form);
                console.log("Response from server:", data);
                setLoading(false);
    
                if (data) {
                    useAuthStore.getState().setUser(data);
                    if (data.user.role === "customer") {
                        navigate("/customer/dashboard");
                    } else if (data.user.role === "provider") {
                        navigate("/provider/dashboard");
                    } else if (data.user.role === "admin") {
                        navigate("/admin/dashboard");
                    }
                }
                
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

    return (
        <Container className='flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center px-10 py-10 rounded-2xl shadow-derek'>
                <header className='flex flex-col justify-center items-start gap-2'>
                    <h2 className='font-extrabold text-5xl tracking-tight text-balance text-shadow-black text-shadow-2xs'>Welcome Back</h2>
                    <h3 className='text-2xl text-neutral-500 tracking-tight text-balance'>Enter Your Credentials to access your account</h3>
                </header>

                <main className='flex flex-col justify-center items-start w-full mt-10'>
                    
                        
                    <div className='flex flex-col justify-center items-start mb-5 w-full '>
                        <label className='font-bold tracking-tight text-balance text-neutral-900 text-[18px]' htmlFor="email">Email Address</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="rounded-full px-5 py-6 "
                        />
                    </div>

                    <div className='flex flex-col justify-center items-start mb-10 w-full '>
                        <label className='font-bold tracking-tight text-balance text-neutral-900 text-[18px]' htmlFor="email">Password</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Type your password"
                            className="rounded-full px-5 py-6 "
                        />
                    </div>
                </main>

                <footer className='flex flex-col justify-center items-center w-full'>
                    <Button type="submit" className="bg-primary py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-secondary shadow-derek">
                        Login to Account
                    </Button>

                    <span>Don't have an account? <NavLink className="text-indigo-600 font-semibold hover:text-indigo-700" to="/signup"> Create an account</NavLink></span>
                </footer>
                
            </form>
        </Container>
    )
}

export default Login