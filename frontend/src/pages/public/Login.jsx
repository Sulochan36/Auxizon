import React from 'react'
import Container from '../../components/Container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '../../components/ui/button'
import { NavLink } from 'react-router-dom'
import { Input } from "@/components/ui/input"

const Login = () => {
    return (
        <Container className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center px-10 py-10 rounded-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]'>
                <header className='flex flex-col justify-center items-start gap-2'>
                    <h2 className='font-extrabold text-5xl tracking-tight text-balance'>Welcome Back</h2>
                    <h3 className='text-2xl text-neutral-500 tracking-tight text-balance'>Enter Your Credentials to access your account</h3>
                </header>

                <main className='flex flex-col justify-center items-start mt-10 '>
                    
                    <div className='flex flex-col justify-center items-start my-5 gap-2'>
                        <p className='font-bold tracking-tight text-balance text-neutral-900 text-[18px]'>Account Type</p>
                        <Tabs>
                            <TabsList className="bg-gray-200 rounded-3xl py-5">
                                <TabsTrigger className="px-20 py-4  active:text-indigo-500 rounded-3xl text-[16px]" value="customer">Customer</TabsTrigger>
                                <TabsTrigger className="px-20 py-4 active:text-indigo-500 rounded-3xl text-[16px]" value="provider">Provider</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                        
                    <div className='flex flex-col justify-center items-start mb-5 w-full'>
                        <label className='font-bold tracking-tight text-balance text-neutral-900 text-[18px]' htmlFor="email">Email Address</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="rounded-full px-5 py-6 "
                        />
                    </div>

                    <div className='flex flex-col justify-center items-start mb-10 w-full'>
                        <label className='font-bold tracking-tight text-balance text-neutral-900 text-[18px]' htmlFor="email">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Type your password"
                            className="rounded-full px-5 py-6 "
                        />
                    </div>
                </main>

                <footer className='flex flex-col justify-center items-center w-full'>
                    <Button className="bg-indigo-500 py-6 text-[18px] rounded-full hover:cursor-pointer w-full mb-4 hover:bg-indigo-700 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                        Login to Account
                    </Button>

                    <span>Don't have an account? <NavLink className="text-indigo-500 font-semibold hover:text-indigo-700" to="/signup"> Create an account</NavLink></span>
                </footer>
                
            </div>
        </Container>
    )
}

export default Login